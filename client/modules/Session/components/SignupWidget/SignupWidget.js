import React, { Component, PropTypes } from 'react';

// Import Style
import styles from '../../../Post/components/PostCreateWidget/PostCreateWidget.css';

export class SignupWidget extends Component {
  registerUser = () => {
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    if (emailRef.value && passwordRef.value) {
      this.props.registerUser(emailRef.value, passwordRef.value);
      emailRef.value = passwordRef.value = '';
    }
  };

  loginUser = () => {
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    if (emailRef.value && passwordRef.value) {
      this.props.loginUser(emailRef.value, passwordRef.value);
      emailRef.value = passwordRef.value = '';
    }
  };

  render() {
    // const cls = `${styles.form} ${(this.props.showAddUser ? styles.appear : '')}`;
    return (
      <div className="add-user-widget">
        <div className={"add-user-form"}>
          <h2 className={styles['form-title']}>Login / Sign Up  </h2>
          <input placeholder={'email'} className={styles['form-field']} ref="email" />
          <input type="password" placeholder={'password'} className={styles['form-field']} ref="password" />
          <div className="submission-buttons">
            <a className={styles['post-submit-button']} href="#" onClick={this.registerUser}>Sign Up</a>
            <a className={styles['post-submit-button']} href="#" onClick={this.loginUser}>Log in</a>
            <a className={styles['post-submit-button']} href="#" onClick={this.props.logoutUser}>Log out</a>
          </div>
        </div>
      </div>
    );
  }
}

SignupWidget.propTypes = {
  registerUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  // showAddUser: PropTypes.bool.isRequired,
};

export default SignupWidget;
