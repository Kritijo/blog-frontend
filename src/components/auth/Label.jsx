const Label = ({ labelName }) => {
    const name =
        String(labelName).charAt(0).toUpperCase() + String(labelName).slice(1);
    return (
        <label
            htmlFor={labelName}
            className="block text-sm font-medium text-gray-700"
        >
            {name}
        </label>
    );
};

export default Label;
