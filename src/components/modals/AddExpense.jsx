import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'

const AddExpense = ({ isExpenseModalVisible, handleExpenseCancle, onFinish }) => {

    const [form] = Form.useForm();

    return (
        <Modal
            open={isExpenseModalVisible}
            onCancel={handleExpenseCancle}
            title="Add Expense"
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    onFinish(values, 'expense');
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
                    rules={[{ required: true, message: 'please fill your expenditure', }]}
                >
                    <Input type='number' className='custom-input' />
                </Form.Item>

                <Form.Item
                    style={{ fontWeight: '600' }}
                    label='Date'
                    name='date'
                    rules={[{ required: true, message: 'please select the spent date', }]}
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
                        <Select.Option value='food'>Food</Select.Option>
                        <Select.Option value='education'>Education</Select.Option>
                        <Select.Option value='office'>Office</Select.Option>
                        <Select.Option value='others'>Others</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button className='btn btn-blue' type='primary' htmlType='submit'>Add a Expense</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddExpense