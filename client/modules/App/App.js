import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignupWidget from '../Session/components/SignupWidget/SignupWidget';

// Import Actions
import { toggleAddPost } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';
import { signup, login, logout, userFromToken } from '../Session/SessionActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentWillMount() {
    this.props.loadUserFromToken();
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  handleRegisterUser = (email, password) => {
    this.props.dispatch(signup({ email, password }));
  }

  handleLoginUser = (email, password) => {
    this.props.dispatch(login({ email, password }));
  }

  handleLogoutUser = () => {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="MERN Starter - Blog App"
            titleTemplate="%s - Blog App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            toggleAddPost={this.toggleAddPostSection}
          />
          <SignupWidget registerUser={this.handleRegisterUser} loginUser={this.handleLoginUser} logoutUser={this.handleLogoutUser} />
          <div className={styles.container}>
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  loadUserFromToken: PropTypes.func.isRequired,
};

// TODO: Move a bunch of code to a container.  eg mapState and mapDispatch
//
function mapDispatchToProps(dispatch) {
  return {
    loadUserFromToken: () => dispatch(userFromToken()),
    dispatch,
  };
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
