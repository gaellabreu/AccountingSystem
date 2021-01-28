import { AutoComplete, Button, Col, DatePicker, Divider, Form, Input, InputNumber, Modal, notification, Popconfirm, Row, Select, Table, Tag, Typography } from 'antd'
import { Xinput } from 'components/common/Xinput'
import { Xdatepicker } from 'components/common/Xdatepicker'
import EntryDetail from 'models/EntryDetail'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Xselect } from 'components/common/Xselect'
import { useSelector } from 'react-redux'
import DocumentType from 'models/DocumentType'
import Currency from 'models/Currency'
import Account from 'models/Account'
import API, { handleError } from 'utils/API'
import { AxiosResponse } from 'axios'
import { Xautocomplete } from 'components/common/Xautocomplete'
import Text from 'antd/lib/typography/Text'

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

    const [data, setData] = useState(new Array<EntryDetail>())
    const [currentEntry, setCurrentEntry] = useState<EntryDetail>(new EntryDetail())
    const [accounts, setAccounts] = useState<Option[]>([])
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const { general } = useSelector((state: any) => state)

    useEffect(() => {
        setCurrentEntry({ ...new EntryDetail() })
    }, [data])

    const onAccountSelected = (value: any, option: any) => {
        console.log(value, option)
        setCurrentEntry({ ...currentEntry, ...{ cuentaId: option.id, cuenta: option.data.cuenta, descripcion: option.data.descripcion } })
    }
    const onDetailChange = (e: any) => setCurrentEntry({ ...currentEntry, ...{ [e.target.name]: e.target.value } })

    const onDecimalChange = (e: any) => {
        setCurrentEntry({ ...currentEntry, ...{ [e.target.name]: e.target.value } })
    }

    const onAccountSearch = async (value: string) => {
        API.get(`financial/searchaccounts?term=${value}`)
            .then((response: AxiosResponse) => {
                console.log(response.data)
                setAccounts([...response.data])
            })
            .catch(handleError)
    }

    const insertDetail = () => {
        if (!currentEntry.cuentaId) {
            notification.warn({ message: 'Debe ingresar una cuenta' })
            return
        }

        if (isNaN(Number.parseFloat(currentEntry.debito)) || isNaN(Number.parseFloat(currentEntry.credito))) {
            notification.warn({ message: 'Debe ingresar valores correctos para débito y crédito' })
            return
        }

        currentEntry.debito = parseFloat(currentEntry.debito).toFixed(2)
        currentEntry.credito = parseFloat(currentEntry.credito).toFixed(2)

        let _key = 0
        if (data.length) {
            const keyArray = data.map((x: EntryDetail) => parseInt(x.key))
            _key = Math.max(...keyArray)
        }

        currentEntry.key = _key.toString()

        setData([...data, ...[currentEntry]])
    }

    const isEditing = (record: EntryDetail) => record.key === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const edit = (record: Partial<EntryDetail> & { key: React.Key }) => {
        console.log(record)
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as EntryDetail;

            console.log(row)

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
            align: 'right' as  'right'
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
                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
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
            <Button danger>Cancelar</Button>,
            <Button type={'primary'}>Contabilizar</Button>,
            <Button type={'dashed'}>Guardar</Button>
        ]}
        title={'Entrada de transacción contable'}>
        <Divider orientation={'left'}>Encabezado</Divider>
        <Row justify={'space-between'} gutter={8}>
            <Col span={12}>
                <Xinput
                    aria-label={'Número de entrada'} />
            </Col>
            <Col span={12}>
                <Xdatepicker
                    aria-label={'Fecha'}
                    defaultValue={moment()}
                    size={'small'} />
            </Col>
        </Row>
        <Row justify={'space-between'} gutter={8}>
            <Col span={12}>
                <Xselect aria-label={'Documento de origen'}>
                    {general.documentTypes.map((x: DocumentType, idx: number) => <Select.Option key={idx} value={x.id}>{x.origendocumento}</Select.Option>)}
                </Xselect>
            </Col>
            <Col span={12}>
                <Xselect aria-label={'Moneda'}>
                    {general.currencies.map((x: Currency, idx: number) => <Select.Option key={idx} value={x.id}>{x.descripcion}</Select.Option>)}
                </Xselect>
            </Col>
        </Row>
        <Row justify={'space-between'} gutter={8}>
            <Col span={24}>
                <Xinput
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
                <Button type={'primary'} size={'small'} onClick={insertDetail}>Insertar entrada</Button>
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
                rowKey={record => record.id}
                size={"small"}
                dataSource={data}
                bordered
                className={'editable-row'}
                columns={mergedColumns}
                pagination={false}
                summary={(data: EntryDetail[]) => {
                    const totalDebit = data.map((detail: EntryDetail) => detail.debito).reduce((acum: number, curr: any) => acum + Number.parseFloat(curr), 0.0)
                    const totalCredit = data.map((detail: EntryDetail) => detail.credito).reduce((acum: number, curr: any) => acum + Number.parseFloat(curr), 0.0)

                    console.log(totalDebit, totalCredit)
                    return <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={2} index={3} />
                            <Table.Summary.Cell index={0}>
                                <Typography.Text strong>Total</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} align={'right'}>
                                <Text strong style={{ fontSize: '18px' }} type={(totalDebit - totalCredit) != 0 ? 'danger' : 'success'}>{totalDebit.toFixed(2)}</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2} align={'right'}>
                                <Text strong style={{ fontSize: '18px' }} type={(totalDebit - totalCredit) != 0 ? 'danger' : 'success'}>{totalCredit.toFixed(2)}</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                }}
            />
        </Form>

    </Modal>
}