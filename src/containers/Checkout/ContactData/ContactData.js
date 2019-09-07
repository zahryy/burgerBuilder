import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import EmailValidator from 'email-validator';
import Spinner from "../../../components/UI/Spinner/Spiner";
import Input from "../../../components/UI/Form/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        validation: {
          required: true,

        },
        touched: false,
        errorMessage:'Name is required',
        valid: false,
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        validation: {
          required: true,
          email:true,

        },
        errorMessage:'Email is required',
        touched: false,
        valid: false,
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        validation: {
          required: true,

        },
        errorMessage:'Street is required',
        touched: false,
        valid: false,
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        validation: {
          required: true,
          minLength: 4,
          maxLength: 5,

        },
        errorMessage:'Zip Code is required',
        touched: false,
        valid: false,
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        validation: {
          required: true,

        },
        touched: false,
        errorMessage:'Country is required',
        valid: false,
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheepest", displayValue: "Cheepest" }
          ]
        },
        value: "fastest "
      }
    },
    formValid: false,
    loading: false
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextState.orderForm !== this.state.orderForm;
  }

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: +this.props.totalPrice.toFixed(2),
      orderData: formData
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== "" && isValid;
      }
      if (rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
      }
      if (rules.maxLength) {
        isValid = value.trim().length <= rules.maxLength && isValid;
      }
      if (rules.email){
        isValid = isValid && EmailValidator.validate(value) ;
      }
    }
    return isValid;
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = {
      ...this.state.orderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      event.target.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched=false;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formValid = true;
    for (let key in updatedOrderForm) {
      if (updatedOrderForm[key].validation) {
        formValid = updatedOrderForm[key].valid && formValid;
      }
    }

    this.setState({ orderForm: updatedOrderForm, formValid: formValid });
  };

  inputBlurHandler=(inputIdentifier)=>{
    const updatedOrderForm= {...this.state.orderForm};
    const updatedFormElement={...this.state.orderForm[inputIdentifier]};
    updatedFormElement.touched=true;
    updatedOrderForm[inputIdentifier]=updatedFormElement;
    this.setState({orderForm:updatedOrderForm});

}

  render() {
    const orderFormArray = [];
    for (let key in this.state.orderForm) {
      orderFormArray.push({
        id: key,
        config: { ...this.state.orderForm[key] }
      });
    }

    let form = (
      <form>
        {orderFormArray.map(item => {
          return (
            <Input
              key={item.id}
              name={item.id}
              elementType={item.config.elementType}
              elementConfig={item.config.elementConfig}
              value={item.config.value}
              shouldValidate={item.config.validation}
              invalid={item.config.valid}
              touched={item.config.touched}
              errorMessage={item.config.errorMessage}
              clicked={()=> this.inputBlurHandler(item.id)}
              changed={event => this.inputChangeHandler(event, item.id)}
            />
          );
        })}

        <Button
          btnType="Success"
          disabled={this.state.formValid === false}
          clicked={this.orderHandler}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
