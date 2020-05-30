import React, { useReducer, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/buttons/Button';
import TextInput from 'components/inputs/Text';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { authorize } from 'actions';
import ErrorMessage from 'components/utilities/ErrorMessage';

const HeaderStyled = styled.h1`
  color: gray;
`;

const BackgroundStyled = styled.div`
  transform: rotate(360deg);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: aliceblue;
`;

const ModalStyled = styled.div`
  height: 350px;
  width: 400px;
  margin: 0 1rem;
  box-shadow: 0 0 10px #838383;
  background: white;
  padding: 1rem;
  transform: translateY(0);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ButtonWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
`;

interface State {
  login: string,
  password: string,
}

interface Action {
  payload: string,
  type: string
}

const formReducer = (state: State, action: Action) => {
  return { ...state, [action.type]: action.payload };
};

const initForm = {
  login: '',
  password: '',
};

type LoginAction = {
  login: string,
  password: string
}

type Props = {
  loginAction: ({ login, password }: LoginAction) => void,
  isFetching: boolean
}

const Login: FunctionComponent<Props> = ({ loginAction, isFetching }) => {
  const [form, dispatch] = useReducer(formReducer, initForm);

  type ChangeValue = {
    name: string,
    value: string
  }

  const handleChangeValue = ({ name, value }: ChangeValue) => {
    dispatch({ type: name, payload: value });
  };


  const handleLogin = async () => {
    loginAction({ login: form.login, password: form.password });
  };

  return (
    <BackgroundStyled>
      <ModalStyled>
        <HeaderStyled>Login</HeaderStyled>
        <TextInput
          label="Login"
          name="login"
          rowGap
          changeValue={handleChangeValue}
          autocomplete="username"
        />
        <TextInput
          label="Password"
          name="password"
          rowGap
          password
          autocomplete="current-password"
          changeValue={handleChangeValue}
        />
        <ErrorMessage height="45px" />
        <ButtonWrapperStyled>
          <Button text="Log in" isFetching={isFetching} onClick={handleLogin} />
        </ButtonWrapperStyled>
      </ModalStyled>
    </BackgroundStyled>
  );
};

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

type MapState = {
  auth: { isFetching: boolean }
}

const mapStateToProps = (state: MapState) => {
  return {
    isFetching: state.auth.isFetching,
  };
};

const mapDispatchToProps = (dispatch : Dispatch) => {
  return {
    loginAction: ({ login, password }: LoginAction) => dispatch(authorize(login, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
