import React, { Component, PropTypes } from 'react';

// Import Style
import styles from '../../../Post/components/PostCreateWidget/PostCreateWidget.css';

export class SignupWidget extends Component {
  addUser = () => {
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    if (emailRef.value && passwordRef.value) {
      this.props.addUser(emailRef.value, passwordRef.value);
      emailRef.value = passwordRef.value = '';
    }
  };

  render() {
    // const cls = `${styles.form} ${(this.props.showAddUser ? styles.appear : '')}`;
    return (
      <div className="add-user-widget">
        <div className={"add-user-form"}>
          <h2 className={styles['form-title']}>Create a user!</h2>
          <input placeholder={'email'} className={styles['form-field']} ref="email" />
          <input type="password" placeholder={'password'} className={styles['form-field']} ref="password" />
          <a className={styles['post-submit-button']} href="#" onClick={this.addUser}>Submit</a>
        </div>
      </div>
    );
  }
}

SignupWidget.propTypes = {
  addUser: PropTypes.func.isRequired,
  // showAddUser: PropTypes.bool.isRequired,
};

export default SignupWidget;
