
### 通过该组件可以深刻理解
* **props 基本使用**
* **学会操作 props.children ，隐式注入 props**
- **掌握表单嵌套原理(现实情况要比这个复杂)**

### FormWrapper.js
```javascript
// FormWrapp.js

import React from "react";

import Form from "./Form";

import FormItem from "./FormItem";

import Input from "./Input";

  

function FormWrapper() {

  const form = React.useRef(null);

  const submit = () => {

    /* 表单提交 */

    form.current.submitForm((formValue) => {

      console.log(formValue);

    });

  };

  

  const reset = () => {

    /* 表单重置 */

    form.current.resetForm();

  };

  

  return (

    <div className="box">

      <Form ref={form}>

        <FormItem name="name" label="我是">

          <Input />

        </FormItem>

        <FormItem name="mes" label="我想对大家说">

          <Input />

        </FormItem>

        <input placeholder="不需要的input" />

        <Input />

      </Form>

      <div className="btns">

        <button className="searchbtn" onClick={submit}>

          提交

        </button>

        <button className="concellbtn" onClick={reset}>

          重置

        </button>

      </div>

    </div>

  );

}

export default FormWrapper;
```

### Form.js
```javascript
import React from "react";

  

class Form extends React.Component {

  state = {

    formData: {},

  };

  

  // 用于提交表单数据

  submitForm = (cb) => {

    cb({ ...this.state.formData });

  };

  

  // 用于重置表单数据

  resetForm = () => {

    const { formData } = this.state;

  

    Object.keys(formData).forEach((item) => {

      formData[item] = "";

    });

  

    this.setState({

      formData,

    });

  };

  

  //   设置表单项数据

  setValue = (name, value) => {

    this.setState({

      formData: {

        ...this.state.formData,

        [name]: value,

      },

    });

  };

  

  render() {

    const { children } = this.props;

    const renderChildren = [];

  

    children.forEach((child) => {

      if (child.type.displayName === "formItem") {

        const { name } = child.props;

  

        const Children = React.cloneElement(

          child,

          {

            key: name,

            handleChange: this.setValue,

            value: this.state.formData[name] || "",

          },

          child.props.children

        );

  

        renderChildren.push(Children);

      }

    });

  

    return renderChildren;

  }

}

  

Form.displayName = "form";

  

export default Form;
```

###  FormItem
```javascript
import React from "react";

  

function FormItem(props) {

  const { children, name, handleChange, value, label } = props;

  const onChange = (value) => {

    /* 通知上一次value 已经改变 */

    handleChange(name, value);

  };

  return (

    <div className="form">

      <span className="label">{label}:</span>

      {React.isValidElement(children) && children.type.displayName === "input"

        ? React.cloneElement(children, { onChange, value })

        : null}

    </div>

  );

}

FormItem.displayName = "formItem";

  

export default FormItem;

```

### Input.js
```javascript
/* Input 组件, 负责回传value值 */

function Input({ onChange, value }) {

  return (

    <input

      className="input"

      onChange={(e) => onChange && onChange(e.target.value)}

      value={value}

    />

  );

}

/* 给Component 增加标签 */

Input.displayName = "input";


export default Input;
```