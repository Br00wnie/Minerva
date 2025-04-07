const initialDocument = () => {
  return { name: defaultName, content: defaultContent };
};

const defaultName = "";
const defaultContent = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];

export default initialDocument();
