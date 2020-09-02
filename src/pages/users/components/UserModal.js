import React, { useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';



const onFinishFailed = errorInfo => {
    console.log('Failed',errorInfo);
}

const UserModal = (props) => {
    const {record,visible,closeHandler,onFinish} =props;
    const [form] = Form.useForm();
    //函数组件没有生命周期 给表单初始值却要在表单渲染之后进行 需要用到useEffect 相当于生命周期里的ComponentDidMount
    //useEffect fn(,[]) 第一个参数是一个函数，第二个参数是一个数组，里面的值变化时，函数被调用 
    useEffect(() => {
        if(record === undefined) {
            form.resetFields(); //清空表单的值
        }else {
            form.setFieldsValue(record) //给表单赋值
        }
        
    }, [visible])

    //提交表单
    const onOk = () =>{
        form.submit();
    }
    
    return (
        <div>
            {/* Modal的forceRender属性 预渲染  加上防止调用form报错*/}
            <Modal visible={visible} title="1"
                onOk={onOk}
                onCancel={closeHandler} forceRender>
                    {/* edit或者add时 点击ok 成功执行onFinish 失败执行onFinishFailed */}
                <Form name='basic' form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                    {/* initialValue设置表单初始值 */}
                    <Form.Item label="Name" name="name" rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Create Time" name="create_time">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
export default UserModal;