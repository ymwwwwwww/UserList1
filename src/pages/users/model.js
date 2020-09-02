//action 是个对象  第一个属性 type（要传递的函数的名字），第二个属性一般来说 是payload 一个对象 ，它存放所有需要传递的数据   
import { getRemoteList, editRecord, deleteRecord, addRecord } from './service'
export default{
    namespace: 'users',

    state:{
        
    },

    effects:{
        //effects里面的函数调用reducers里面的函数 或者调用内部其他的函数 要用yield put()
        //effects里面的函数有两个参数  action 和 effects 一个对象：{put,call}   ，没有返回值，返回页面数据只能由reducers来完成
        //不要直接把裸数据传给reducers ， 用{}包裹一层？ 或者在state里初始化一下要传的数据
        *getRemote(action,{ put, call }) {
            const data = yield call(getRemoteList);
            if(data) {
                yield put({
                    type: 'getList',
                    payload: data
                })
            }

        },
        *edit({payload:{values,id}},{ put, call }) {
            //要传的参数放在一个对象内作为call函数的第二个参数
            const data = yield call(editRecord,{values,id});
            console.log(data)
            //edit成功之后刷新列表
            if(data) {
                yield put({
                    type: 'getRemote'
                });
            }
        },

        *delete({payload:{id}},{ put, call }) {
            const data = yield call(deleteRecord,{id});
            //delete成功之后刷新列表
            if(data) {
                yield put({
                    type: 'getRemote'
                });
            }
        },

        *add({payload:{values}},{ put, call }) {
            const data = yield call(addRecord,{values});
            //add成功之后刷新列表
            if(data) {
                yield put({
                    type: 'getRemote'
                });
            }
        }
    },
    reducers:{
        //reducers里的函数有两个参数 state(上一次的数据) ,action   返回一个新的state
        getList(state,{payload}){
            return payload
              //返回的数据名称实际是model的namespace
        }
    },
    subscriptions:{
        setup({ dispatch, history }) {
            return history.listen((location,action) => {
                if(location.pathname === '/users') {
                    //引用同文件的函数 直接写函数名
                    dispatch({
                        type:'getRemote',
                    })
                }
            })

        }
    }
}

