import React from 'react';
import { SafeAreaView, View, Text, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { authenticateAction, logoutAction } from '../actions';
import styled from 'styled-components';
import { Formik } from 'formik';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import ChatScreen from './ChatScreen';
import TabNavigator from '../Navigators/TabNavigator';

const Wrapper = styled(SafeAreaView)`
    width: 100%;
    height: 100%;
    background: white;
    justify-content: center;
    align-items: center;
`;
const LoginText = styled(Text)`
    font-size: 40px;
    margin-bottom: 40px;
`;
const StyledInput = styled(Input)`
    width: 200px;
    height: 30px;
    background-color: #eee;
    margin-bottom: 10px;
    padding: 0 10px;
`;
const StyledView = styled(View)`
    display: flex;
    align-items: center;
`;
const ButtonsWrapper = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 225px;
`;

const LoginScreen = ({ authenticate, logout, userID }) => {
    const { navigate } = useNavigation();

    return (
        <Wrapper>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={({ username, password }) => {
                    authenticate(username, password);
                    Keyboard.dismiss();
                }}
            >
                {({ values, handleChange, handleSubmit }) => {

                    if (userID) {


                        // navigate('Chat');

                        // return <TabNavigator />
                    }

                    return (
                        <StyledView>
                            <LoginText>Logowanie</LoginText>
                            <StyledInput
                                as={TextInput}
                                type='text'
                                name='username'
                                placeholder='username'
                                values={values.username}
                                onChangeText={handleChange('username')}
                            />
                            <StyledInput
                                as={TextInput}
                                type='password'
                                name='password'
                                placeholder='password'
                                values={values.password}
                                onChangeText={handleChange('password')}
                            />

                            <ButtonsWrapper>
                                <Button
                                    activeOpacity={0.7}
                                    delayPressIn={0}
                                    onPress={() => navigate('Register')}
                                >
                                    Załóż konto
                            </Button>
                                <Button title="Submit" onPress={handleSubmit}>Zaloguj się</Button>
                            </ButtonsWrapper>
                            <Button title="Submit" onPress={logout}>Wyloguj się</Button>
                        </StyledView>
                    )
                }}
            </Formik>
        </Wrapper>
    )
};
const mapStateToProps = ({ userID = null }) => ({ userID });

const mapDispatchToProps = (dispatch) => ({
    authenticate: (username, password) => dispatch(authenticateAction(username, password)),
    logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);