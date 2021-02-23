import { Button, Col, Divider, Form, Input, InputNumber, Modal, notification, Popconfirm, Row, Select, Table, Tag, Typography } from 'antd'
import { Xinput } from 'components/common/Xinput'
import { Xdatepicker } from 'components/common/Xdatepicker'
import EntryDetail from 'models/EntryDetail'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Xselect } from 'components/common/Xselect'
import { useSelector } from 'react-redux'
import DocumentType from 'models/DocumentType'
import Currency from 'models/Currency'
import API, { handleError } from 'utils/API'
import { AxiosResponse } from 'axios'
import { Xautocomplete } from 'components/common/Xautocomplete'
import EntryHeader from 'models/EntryHeader'
import { GET_EXCHANGE_RATE } from 'utils/Routes'
import AddExchangeRate from './AddExchangeRate'

interface Option {
    value: string,
    id: string,
    data?: any
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: EntryDetail;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `${title} obligatorio!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
};

export default (props: any) => {

    const [header, setHeader] = useState(new EntryHeader())
    const [data, setData] = useState(new Array<EntryDetail>())
    const [currentEntry, setCurrentEntry] = useState<EntryDetail>(new EntryDetail())
    const [exchangerVisible, setExchangerVisible] = useState(false)
    const [accounts, setAccounts] = useState<Option[]>([])
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const { general } = useSelector((state: any) => state)

    useEffect(() => {
        console.log(general)
    }, [general])

    useEffect(() => {
        setCurrentEntry({ ...new EntryDetail(), ...{ cuentaId: currentEntry.cuentaId, cuenta: currentEntry.cuenta, descripcion: currentEntry.descripcion } })
    }, [data])

    const toggleExchanger = () => setExchangerVisible(!exchangerVisible)
    const onHeaderChange = (e: any) => setHeader({ ...header, ...{ [e.target.name]: e.target.value } })
    const onHeaderDateChange = (data: any, date: string) => setHeader({ ...header, ...{ fecha: date } })
    const onHeaderSelectChange = (value: number, name: string) => setHeader({ ...header, ...{ [name]: value } })

    const onAccountSelected = (value: any, option: any) => setCurrentEntry({ ...currentEntry, ...{ cuentaId: option.id, cuenta: option.data.cuenta, descripcion: option.data.descripcion } })
    const onDetailChange = (e: any) => setCurrentEntry({ ...currentEntry, ...{ [e.target.name]: e.target.value } })

    const onDecimalChange = (e: any) => setCurrentEntry({ ...currentEntry, ...{ [e.target.name]: e.target.value } })

    const onAccountSearch = async (value: string) => API.get(`financial/searchaccounts?term=${value}`)
        .then((response: AxiosResponse) => setAccounts([...response.data]))
        .catch(handleError)


    useEffect(() => {
        if (header.moneda && header.moneda != general.defaultCurrency)
            getExchangeRate()
    }, [header.moneda])

    const getExchangeRate = () => {
        const { id } = general.currencies.find((c: Currency) => c.id == header.moneda) || 0
        API.get(`${GET_EXCHANGE_RATE}?idmoneda=${id}&docdate=${header.fecha}`)
            .then((response: AxiosResponse) => {
                setHeader({ ...header, ...{ rate: response.data } })
                if (!response.data) {
                    notification.warning({ message: 'La tasa del día no ha sido registrada para esta moneda' })
                    toggleExchanger()
                }
            })
    }

    const insertDetail = () => {
        if (!currentEntry.cuentaId) {
            notification.warn({ message: 'Debe ingresar una cuenta.' })
            return
        }

        console.log(currentEntry.debito, currentEntry.credito)

        if (isNaN(Number.parseFloat(currentEntry.debito)) || isNaN(Number.parseFloat(currentEntry.credito))) {
            notification.warn({ message: 'Debe ingresar valores correctos para débito y crédito.' })
            return
        }

        if ((!isNaN(Number.parseFloat(currentEntry.debito)) && Number.parseFloat(currentEntry.debito) == 0) && (!isNaN(Number.parseFloat(currentEntry.credito)) && Number.parseFloat(currentEntry.credito) == 0)) {
            notification.warn({ message: 'Débito y crédito no pueden ser cero.' })
            return
        }

        currentEntry.debito = parseFloat(currentEntry.debito).toFixed(2)
        currentEntry.credito = parseFloat(currentEntry.credito).toFixed(2)

        let _key = 0
        if (data.length) {
            const keyArray = data.map((x: EntryDetail) => parseInt(x.key))
            _key = Math.max(...keyArray)
        }

        currentEntry.key = (_key + 1).toString()

        setData([...data, ...[currentEntry]])
    }

    const isEditing = (record: EntryDetail) => record.key === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const edit = (record: Partial<EntryDetail> & { key: React.Key }) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as EntryDetail;

            if (isNaN(Number.parseFloat(row.debito)) || isNaN(Number.parseFloat(row.credito))) {
                notification.warn({ message: 'Debe ingresar valores correctos para débito y crédito' })
                return
            }

            row.debito = parseFloat(row.debito).toFixed(2)
            row.credito = parseFloat(row.credito).toFixed(2)

            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const remove = (record: EntryDetail) => {
        const idx = data.findIndex((x: EntryDetail) => x.key == record.key)
        data.splice(idx, 1)
        setData([...data])
    }

    const columns = [
        {
            title: "Cuenta",
            dataIndex: "cuenta",
            key: "cuenta",
        },
        {
            title: "Descripcion",
            dataIndex: "descripcion",
            key: "descripcion",
        },
        {
            title: "Comentario",
            dataIndex: "comentario",
            key: "comentario",

        },
        {
            title: "Débito",
            dataIndex: "debito",
            key: "debito",
            editable: true,
            align: 'right' as 'right'
        },
        {
            title: "Crédito",
            dataIndex: "credito",
            key: "credito",
            editable: true,
            align: 'right' as 'right'
        },
        {
            title: 'Acción',
            dataIndex: 'operation',
            render: (_: any, record: EntryDetail) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Guardar
                  </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancelar</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <span>
                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 8 }}>
                                Editar
                            </Typography.Link>
                            <Typography.Link disabled={editingKey !== ''} onClick={() => remove(record)}>
                                Borrar
                            </Typography.Link>
                        </span>
                    );
            },
        },
    ]

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: EntryDetail) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return <Modal
        width={1000}
        visible={props.visible}
        onCancel={props.close}
        footer={[
            <Button key={0} danger>Cancelar</Button>,
            <Button key={1} type={'primary'}>Contabilizar</Button>,
            <Button key={2} type={'dashed'}>Guardar</Button>
        ]}
        title={'Entrada de transacción contable'}>
        <Divider orientation={'left'}>Encabezado</Divider>
        <Row justify={'space-between'} gutter={8}>
            <Col span={12}>
                <Xinput
                    aria-label={'Número de entrada'}
                    name={'entrada'}
                    value={header.entrada}
                    onChange={onHeaderChange}
                />

            </Col>
            <Col span={12}>
                <Xdatepicker
                    aria-label={'Fecha'}
                    defaultValue={moment()}
                    value={moment(header.fecha)}
                    onChange={onHeaderDateChange}
                    size={'small'} />
            </Col>
        </Row>
        <Row justify={'space-between'} gutter={8}>
            <Col span={12}>
                <Xselect aria-label={'Documento de origen'} value={header.origen} onSelect={(e: number) => onHeaderSelectChange(e, 'origen')}>
                    {general.documentTypes.map((x: DocumentType, idx: number) => <Select.Option key={idx} value={x.id}>{x.origendocumento}</Select.Option>)}
                </Xselect>
            </Col>
            <Col span={12}>
                <Xselect aria-label={'Moneda'} value={header.moneda || general.defaultCurrency} onSelect={(e: number) => onHeaderSelectChange(e, 'moneda')}>
                    {general.currencies.map((x: Currency, idx: number) => <Select.Option key={idx} value={x.id}>{x.descripcion}</Select.Option>)}
                </Xselect>
            </Col>
        </Row>
        <Row justify={'space-between'} gutter={8}>
            <Col span={24}>
                <Xinput
                    name={'referencia'}
                    value={header.referencia}
                    aria-label={'Referencia'} />
            </Col>
        </Row>

        <Divider orientation={'left'}>Detalle</Divider>

        <Row justify={'space-between'} gutter={8}>
            <Col span={16}>
                <Xautocomplete
                    aria-label={'Cuentas'}
                    autoClearSearchValue={true}
                    onSelect={onAccountSelected}
                    onSearch={onAccountSearch}
                    options={accounts}
                    showArrow />
            </Col>
            <Col span={4}>
                <Xinput
                    aria-label={'Débito'}
                    type={'number'}
                    name={'debito'}
                    onChange={onDecimalChange}
                    value={currentEntry.debito} />
            </Col>
            <Col span={4}>
                <Xinput
                    aria-label={'Crédito'}
                    type={'number'}
                    name={'credito'}
                    onChange={onDecimalChange}
                    value={currentEntry.credito} />
            </Col>
        </Row>
        <Row justify={'space-between'} gutter={8}>
            <Col span={20}>
                <Xinput
                    aria-label={'Comentario'}
                    name={'comentario'}
                    onChange={onDetailChange}
                    value={currentEntry.comentario} />
            </Col>
            <Col span={4}>
                <br />
                <Button disabled={!header.rate} type={'primary'} size={'small'} onClick={insertDetail}>Insertar entrada</Button>
            </Col>
        </Row>

        <Divider />

        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell
                    }
                }}
                rowKey={record => record.key}
                size={"small"}
                dataSource={data}
                bordered
                className={'editable-row'}
                columns={mergedColumns}
                pagination={false}
                summary={(data: EntryDetail[]) => {
                    const totalDebit = data.map((detail: EntryDetail) => detail.debito).reduce((acum: number, curr: any) => acum + Number.parseFloat(curr), 0.0)
                    const totalCredit = data.map((detail: EntryDetail) => detail.credito).reduce((acum: number, curr: any) => acum + Number.parseFloat(curr), 0.0)

                    return <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={2} index={3} />
                            <Table.Summary.Cell index={0}>
                                <Typography.Text strong>Total</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} align={'right'}>
                                <Tag style={{ fontSize: '18px' }} color={(totalDebit - totalCredit) != 0 ? 'red' : 'success'}>{totalDebit.toFixed(2)}</Tag>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2} align={'right'}>
                                <Tag style={{ fontSize: '18px' }} color={(totalDebit - totalCredit) != 0 ? 'red' : 'success'}>{totalCredit.toFixed(2)}</Tag>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                }}
            />
        </Form>

        <AddExchangeRate visible={exchangerVisible} close={toggleExchanger} moneda={header.moneda} date={header.fecha} />

    </Modal>
}