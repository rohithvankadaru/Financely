import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'

const AddIncome = ({ isIncomeModalVisible, handleIncomeCancle, onFinish }) => {

    const [form] = Form.useForm();

    return (
        <Modal
            open={isIncomeModalVisible}
            onCancel={handleIncomeCancle}
            title="Add Income"
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    onFinish(values, 'income');
                    form.resetFields();
                }}
            >
                <Form.Item
                    style={{ fontWeight: '600' }}
                    label='Name'
                    name='name'
                    rules={[{ required: true, message: 'Name of transaction is required!', }
                    ]}
                >
                    <Input type='text' className='custom-input' />
                </Form.Item>

                <Form.Item
                    style={{ fontWeight: '600' }}
                    label='Amount'
                    name='amount'
                    rules={[{ required: true, message: 'please fill your income', }]}
                >
                    <Input type='number' className='custom-input' />
                </Form.Item>

                <Form.Item
                    style={{ fontWeight: '600' }}
                    label='Date'
                    name='date'
                    rules={[{ required: true, message: 'please select income date', }]}
                >
                    <DatePicker format='YYYY-MM-DD' className='custom-input' />
                </Form.Item>

                <Form.Item
                    style={{ fontWeight: '600' }}
                    label='Tag'
                    name='tag'
                    rules={[{ required: true, message: 'please select a Tag', }]}
                >
                    <Select className='select-input-2'>
                        <Select.Option value='salary'>Salary</Select.Option>
                        <Select.Option value='freelance'>Freelance</Select.Option>
                        <Select.Option value='investement'>Investement</Select.Option>
                        <Select.Option value='others'>Others</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button className='btn btn-blue' type='primary' htmlType='submit'>Add Income</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddIncome