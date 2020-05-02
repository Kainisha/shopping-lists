import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Button from 'components/buttons/Button';
import TextInput from 'components/inputs/Text';
import { connect } from 'react-redux';
import { authorize } from 'actions';

const errorShow = keyframes`
    to {
        opacity: 1;
    }
`;

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
  height: 400px;
  width: 400px;
  box-shadow: 0 0 10px #838383;
  background: white;
  padding: 1rem;
  transform: translateY(0);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ErrorWrapperStyled = styled.div`
  height: 20px;
  margin: 1rem 0;
`;

const ErrorStyled = styled.div`
  color: ${({ theme }) => theme.errorColor};
  opacity: 0;
  transform-origin: top;
  animation: ${errorShow} 300ms linear forwards;
`;

const ButtonWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
`;

const formReducer = (state, action) => {
  return { ...state, [action.type]: action.payload };
};

const initForm = {
  login: '',
  password: '',
};

const Login = ({ loginAction, isFetching, isError }) => {
  const [form, dispatch] = useReducer(formReducer, initForm);

  const handleChangeValue = ({ name, value }) => {
    dispatch({ type: name, payload: value });
  };

  const handleLogin = async () => {
    loginAction({ login: form.login, password: form.password });
  };

  return (
    <BackgroundStyled>
      <ModalStyled>
        <HeaderStyled>Login</HeaderStyled>
        <TextInput label="Login" name="login" rowGap changeValue={handleChangeValue} />
        <TextInput
          label="Password"
          name="password"
          rowGap
          password
          changeValue={handleChangeValue}
        />
        <ErrorWrapperStyled>
          {isError && <ErrorStyled>Invalid login or password</ErrorStyled>}
        </ErrorWrapperStyled>
        <ButtonWrapperStyled>
          <Button text="Log in" isFetching={isFetching} onClick={handleLogin} />
        </ButtonWrapperStyled>
      </ModalStyled>
    </BackgroundStyled>
  );
};

Login.propTypes = {
  loginAction: PropTypes.func,
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
};

Login.defaultProps = {
  loginAction: () => {},
  isFetching: false,
  isError: false,
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isError: state.auth.isError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: ({ login, password }) => dispatch(authorize(login, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
