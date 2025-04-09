import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addTodos, deleteTodos } from "./srs/conterSlike"; // store.ts faylingizdan import
import { RootState } from "./srs/conterSlike";
import { CheckOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.counter.todoss); // Redux’dan todosni olish
  const [form] = Form.useForm();

  const onFinish = (values: { text: string }) => {
    if (values.text) {
      dispatch(addTodos(values.text)); // Input’dagi matnni Redux’ga qo‘shish
      form.resetFields(); // Formani tozalash
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodos(id));
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 mx-auto p-6 rounded-xl shadow-2xl max-w-md mt-10">
      <Form form={form} onFinish={onFinish} className="flex gap-5">
        <Form.Item name="text" className="w-full mb-0">
          <Input
            type="text"
            placeholder="Matn kiriting..."
            className="rounded-xl !border-none  !bg-gray-600 !text-white placeholder-gray-300 focus:!ring-2 focus:!ring-blue-500 transition-all duration-300"
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="rounded-xl px-5 h-10 font-medium shadow-md hover:shadow-lg transition-all duration-200"
        >
          + Qo‘shish
        </Button>
      </Form>

      {/* Todos ro‘yxatini ekranga chiqarish */}
      <div className="mt-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-gray-600 p-2 rounded-lg text-white mb-2 flex  justify-between items-center"
          >
            <p> {todo.name} </p>
            <div className=" flex items-center gap-2">
              {" "}
              <Button onClick={() => console.log("Done:", todo.id)}>
                <CheckOutlined />
              </Button>
              <Button
                onClick={() => {
                  console.log("Edit:", todo.id);
                }}
              >
                <FormOutlined />
              </Button>
              <Button danger onClick={() => handleDelete(todo.id)}>
                <DeleteOutlined />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
