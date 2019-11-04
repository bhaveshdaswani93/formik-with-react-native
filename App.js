import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert

} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const FormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email.")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .test(
      "confirm-password-test",
      "Password and confirm password should match",
      function(value) {
        return value === this.parent.password;
      }
    )
});

const signUp = ({ email,password }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com') {
        reject(new Error("Duplicate email,please try again."));
      }
      resolve(true);
    }, 5000);
  });

export default function App() {
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={FormValidationSchema}
        onSubmit={(values,actions)=>signUp({ email: values.email,password:values.password })
        .then(() => {
          Alert.alert('User Registered Succesfully.');
        })
        .catch(error => {
          actions.setFieldError('general', error.message);
        })
        .finally(() => {
          actions.setSubmitting(false);
        })}
      >
        {props => {
          return (
            <View style={styles.container}>
              <View style={styles.inputStyle}>
                <TextInput
                  placeholder="Email"
                  value={props.values.email}
                  onChangeText={props.handleChange("email")}
                  onBlur={props.handleBlur("email")}
                />
              </View>

              <Text style={{ color: "red" }}>
                {props.touched.email && props.errors.email}
              </Text>
              <View style={styles.inputStyle}>
                <TextInput
                  placeholder="Password"
                  value={props.values.password}
                  onChangeText={props.handleChange("password")}
                  onBlur={props.handleBlur("password")}
                />
              </View>

              <Text style={{ color: "red" }}>
                {props.touched.password && props.errors.password}
              </Text>
              <View style={styles.inputStyle}>
                <TextInput
                  placeholder="Confrim Password"
                  value={props.values.confirmPassword}
                  onChangeText={props.handleChange("confirmPassword")}
                  onBlur={props.handleBlur("confirmPassword")}
                />
              </View>
              <Text style={{ color: "red" }}>
                {props.touched.confirmPassword && props.errors.confirmPassword}
              </Text>
              {props.isSubmitting?<ActivityIndicator/>:<Button onPress={props.handleSubmit}  title="Submit" />}
              {<Text style={{ color: 'red' }}>{props.errors.general}</Text>}
              
            </View>
          );
        }}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green"
  },
  inputStyle: {
    padding: 10,
    width: "60%",
    borderWidth: 1,
    borderColor: "black"
  }
});
