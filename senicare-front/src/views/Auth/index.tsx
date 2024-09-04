import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import InputBox from 'src/components/InputBox';
import path from 'path';

type AuthPath = '회원가입' | '로그인'; 

interface SnsContainerProps {
  type: AuthPath;
};

function SnsContainer({ type }: SnsContainerProps) {
  return (
    <div className="sns-container">
      <div className="title">SNS {type}</div>
      <div className="sns-button-container">
        <div className={`sns-button ${type === '회원가입' ? 'md ' : ''}kakao`}></div>
        <div className={`sns-button ${type === '회원가입' ? 'md ' : ''}naver`}></div>
      </div>
    </div>
  )
}

interface AuthComponentProps {
  onPathChange: (path: AuthPath) => void;
}

function Signup({ onPathChange }: AuthComponentProps) {


  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [telNumber, setTelNumber] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');

  const [nameMessage, setNameMessage] = useState<string>('');
  const [idMessage, setIdMessage] = useState<string>('');
  const [paswordMessage, setPaswordMessage] = useState<string>('');
  const [paswordCheckMessage, setPaswordCheckMessage] = useState<string>('');
  const [telNumberMessage, setTelNumberMessage] = useState<string>('');
  const [authNumberMessage, setAuthNumberMessage] = useState<string>('');

  const [nameMessageError, setNameMessageError] = useState<boolean>(false);
  const [idMessageError, setIdMessageError] = useState<boolean>(false);
  const [paswordMessageError, setPaswordMessageError] = useState<boolean>(false);
  const [pasworCheckdMessageError, setPaswordCheckMessageError] = useState<boolean>(false);
  const [telNumberMessageError, setTelNumberMessageError] = useState<boolean>(false);
  const [authNumberMessageError, setAuthNumberMessageError] = useState<boolean>(false);

  const [isCheckedId, setCheckedId] = useState<boolean>(false);
  const [isMatchedPassword, setMatchedPassword] = useState<boolean>(false);
  const [isCheckedPassword, setCheckedPassword] = useState<boolean>(false);
  const [isSend, setSend] = useState<boolean>(false);
  const [isCheckedAuthNumber, setCheckedAuthNumber] = useState<boolean>(false);


  const isComplete = name && id && isCheckedId && password && passwordCheck && isCheckedPassword
    && telNumber && isSend && authNumber && isMatchedPassword && isCheckedAuthNumber;

  const onNameChangeHanedler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setId(value);
    setCheckedId(false);
    setIdMessage('');
  };

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);

    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/
    const isMatched = pattern.test(value);


    const message = (isMatched || !value) ? '' : '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.';
    setPaswordMessage(message);
    setPaswordMessageError(!isMatched);

    if (!passwordCheck) return;

    const isEqual = passwordCheck === value;
    const checkMessage = isEqual ? '' : '비밀번호가 일치하지 않습니다.';
    setPaswordCheckMessage(checkMessage);
    setPaswordMessageError(!isEqual);
    setMatchedPassword(isMatched);
  };
  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPasswordCheck(value);


  };
  const onTelNUmberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTelNumber(value);
    setSend(false);
    setTelNumberMessage('');

    const pattern = /^(?=.*[0-9]).{3,13}$/


    const telMatched = pattern.test(value);
    const message = telMatched ? '' : '전화번호를 입력해주세요.';
    setTelNumberMessage(message);
    setTelNumberMessageError(!telMatched);
  };
  const onAUthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAuthNumber(value);
    setCheckedAuthNumber(false);
    setAuthNumberMessage('');

    // const isauthMatched = authNumber === value;
    // const message = isauthMatched ? '' : '인증번호를 입력하세요.';
    // setAuthNumberMessage(message);
    // setAuthNumberMessageError(!isauthMatched);
  };

  const onIdCheckClickHandler = () => {
    if (!id) return;

    const isDuplicated = id === 'qwer1234';
    const message = isDuplicated ? '이미 사용중인 아이디입니다.' : '사용 가능한 아이디입니다';
    setIdMessage(message);
    setIdMessageError(isDuplicated);
    setCheckedId(!isDuplicated);

  };

  const onTelNumberSendClickHandler = () => {
    if (!telNumber) return;

    const pattern = /^[0-9]{11}$/;
    const isMatched = pattern.test(telNumber);

    if (!isMatched) {
      setTelNumberMessage('숫자 11자리 입력해주세요.');
      setTelNumberMessageError(true);
      return
    }
    setSend(true);

    setTelNumberMessage('인증번호가 전송되었습니다.');
    setTelNumberMessageError(false);

    // const isDuplicated2 = telNumber === '05120022222';
    // const message = isDuplicated2 ? '전화번호가 존재합니다' : '사용할 수 있는 전화번호 입니다.';
    // setTelNumberMessage(message);
    // setTelNumberMessageError(isDuplicated2);

  };

  const onAUthNumberCheckClickHandler = () => {
    if (!authNumber) return;

    const isMatched = authNumber === '0725';
    const message = isMatched ? '인증번호가 확인되었습니다.' : '인증번호가 일치하지 않습니다.'
    setAuthNumberMessage(message);
    setAuthNumberMessageError(!isMatched);
    setCheckedAuthNumber(isMatched);

    // const isDuplicated3 = authNumber === '7099';
    // const message = isDuplicated3 ? '인증번호가 존재합니다.' : '인증번호 사용가능.';
    // setAuthNumberMessage(message);
    // setAuthNumberMessageError(isDuplicated3);
  };

  const onSignUpButtonHandler = () => {
    if (!isComplete) return;

    alert('회원가입 완료!');
  };

  useEffect(() => {
    if (!password || !passwordCheck) return;

    const isMatched = password === passwordCheck;
    const message = isMatched ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.';
    setPaswordCheckMessage(message);
    setPaswordCheckMessageError(!isMatched);
    setCheckedPassword(isMatched);
  }, [password, passwordCheck]);

  return (
    <div style={{ gap: '16px' }} className="auth-box">
      <div className="title-box">
        <div className="title">시니케어</div>
        <div className="logo"></div>
      </div>
      <SnsContainer type='회원가입' />
      <div style={{ width: '64px' }} className="divider"></div>

      <div className="input-container">

        <InputBox messageError={nameMessageError} message={nameMessage} value={name} label='이름' type='text' placeholder='이름을 입력해주세요.' onChange={onNameChangeHanedler} />

        <InputBox messageError={idMessageError} message={idMessage} value={id} label='아이디' type='text' placeholder='아이디를 입력해주세요.' buttonName='중복확인' onChange={onIdChangeHandler} onButtonClick={onIdCheckClickHandler} />

        <InputBox messageError={paswordMessageError} message={paswordMessage} value={password} label='비밀번호' type='password' placeholder='비밀번호를 입력해주세요.' onChange={onPasswordChangeHandler} />

        <InputBox messageError={pasworCheckdMessageError} message={paswordCheckMessage} value={passwordCheck} label='비밀번호 확인' type='password' placeholder='비밀번호를 입력해주세요.' onChange={onPasswordCheckChangeHandler} />

        <InputBox messageError={telNumberMessageError} message={telNumberMessage} value={telNumber} label='전화번호' type='text' placeholder='-빼고 입력해주세요.' buttonName='전화번호 인증' onChange={onTelNUmberChangeHandler} onButtonClick={onTelNumberSendClickHandler} />
        {isSend &&
          <InputBox messageError={authNumberMessageError} message={authNumberMessage} value={authNumber} label='인증번호' type='text' placeholder='인증번호 4자리를 입력해주세요.' buttonName='인증 확인' onChange={onAUthNumberChangeHandler} onButtonClick={onAUthNumberCheckClickHandler} />
        }





      </div>

      <div className="button-container">
        <div className={`button ${isComplete ? 'primary' : 'disable'} full-width`} onClick={onSignUpButtonHandler}>회원가입</div>
        <div className="link" onClick={() =>onPathChange('로그인')}>로그인</div>
      </div>
    </div>
  )
}

function Signin( { onPathChange }: AuthComponentProps) {

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [message, setMessage] = useState<string>('');

  const onIdChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setId(value);
    setMessage('');
  };
  
  const onPasswordChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setMessage('');
  };

  const onSignInButtonHandler = () => {
    if (!id || !password)return;

    if (id !== 'qwer1234' || password !== 'asdf0987') {
      setMessage('로그인 정보가 일치하지 않습니다.');
      return;
    }

    alert('로그인 성공');
  };

  useEffect(() => {
    setMessage('');
  },[id, password]);

  return (
    <div className="auth-box">
                <div className="title-box">
                    <div className="title">시니케어</div>
                    <div className="logo"></div>
                </div>
                <div className="input-container">
                    <InputBox value={id} type='text' label='아이디' message='' messageError placeholder='아이디를 입력해주세요.' onChange={onIdChangeHandler}/>
                    <InputBox value={password} type='password' label='비밀번호' message={message} messageError placeholder='비밀번호를 입력해주세요.' onChange={onPasswordChangeHandler}/>
                </div>
                <div className="button-container">
                    <div className="button primary full-width" onClick={onSignInButtonHandler}>로그인</div>
                    <div className="link" onClick={() => onPathChange('회원가입')}>회원가입</div>
                </div>
                <div style={{width : '64px'}} className="divider"></div>
                <SnsContainer type='로그인'/>
            </div>
  );
}

export default function Auth() {

  const [path, setPath] = useState<AuthPath>('로그인');

  const onPathChangeHandler = (path: AuthPath) => {
    setPath(path);
  };

  return (
    <div id="auth-wrapper">
      <div className="auth-image"></div>
      <div className="auth-container"></div>
      {path === '로그인' ?
      <Signin onPathChange={onPathChangeHandler}/>
      :
      <Signup onPathChange={onPathChangeHandler}/> 
      }
    </div>
  )
}