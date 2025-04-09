import { Form, Input, Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/redux-store";
import { CheckOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { useState } from "react";
import { addTodos, deleteTodos, EditTodos } from "./redux/counter.slice";

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.counter.todoss);
  const [form] = Form.useForm();
  const [edit, setEdit] = useState<{ id: number; name: string }>();
  const [searchInput, setSearchInput] = useState("");

  const onFinish = (values: { text: string }) => {
    if (values.text) {
      dispatch(addTodos(values.text));
      form.resetFields();
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodos(id));
  };

  const searchTodos = todos.filter((item) => {
    return item.name.toUpperCase().includes(searchInput.toUpperCase());
  });

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 mx-auto p-6 rounded-xl shadow-2xl max-w-md mt-10">
      {todos && (
        <Form form={form} onFinish={onFinish} className="flex gap-5">
          <Form.Item>
            <Input
              value={searchInput}
              placeholder="Search..."
              className="rounded-xl !border-none  !bg-gray-600 !text-white placeholder-gray-300 focus:!ring-2 focus:!ring-blue-500 transition-all duration-300"
              onChange={(e) => {
                setSearchInput(e.currentTarget.value);
              }}
            />
          </Form.Item>
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
      )}

      <div className="mt-4">
        {searchTodos.map((todo) => (
          <div
            key={todo.id}
            className="bg-gray-600 p-2 rounded-lg text-white mb-2 flex  justify-between items-center"
          >
            <p> {todo.name} </p>
            <div className=" flex items-center gap-2">
              <Button onClick={() => console.log("Done:", todo.id)}>
                <CheckOutlined />
              </Button>
              <Button
                htmlType="submit"
                onClick={() => {
                  setEdit(todo);

                  console.log("Edit:");
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
      <Edit
        onClose={() => {
          setEdit(undefined);
        }}
        editItem={edit}
      />
    </div>
  );
};

function Edit({
  onClose,
  editItem,
}: {
  onClose: () => void;
  editItem?: { id: number; name: string };
}) {
  const dispatch = useDispatch();
  return (
    <>
      {" "}
      <Drawer
        title="Basic Drawer"
        onClose={() => {
          onClose();
        }}
        open={Boolean(editItem)}
      >
        <Form
          initialValues={{ name: editItem?.name }}
          variant="underlined"
          onFinish={(values: { name: string }) => {
            dispatch(EditTodos({ id: editItem?.id, name: values.name }));
            onClose();
          }}
        >
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input
              placeholder="User Edit
            "
            />
          </Form.Item>{" "}
          <Form.Item>
            <Button htmlType="submit">Saqlash</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
export default App;
