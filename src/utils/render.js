export const render = (element, propertyContent = "textContent") => (
  values,
  ...dynamicValues
) => {
  let content = "";
  values.forEach((value, index) => {
    const dynamicValue = dynamicValues[index] ? dynamicValues[index] : "";
    content += `${value} ${dynamicValue}`;
  });

  element[propertyContent] = content;
};
