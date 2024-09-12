import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import InputBox from 'src/components/InputBox';
import path from 'path';
import axios from 'axios';
import { idCheckRequest, telAuthRequestDto } from 'src/apis';
import { IdCheckRequestDto, TelAuthRequestDto } from 'src/apis/dto/request/auth';
import { ResponseDto } from 'src/apis/dto/response';


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

// component: 회원가입 화면 컴포넌트 //
function Signup({ onPathChange }: AuthComponentProps) {


  // state: 요양사 입력 정보 상태 //
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [telNumber, setTelNumber] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');

  // state: 요양사 입력 메세지 상태 //
  const [nameMessage, setNameMessage] = useState<string>('');
  const [idMessage, setIdMessage] = useState<string>('');
  const [paswordMessage, setPaswordMessage] = useState<string>('');
  const [paswordCheckMessage, setPaswordCheckMessage] = useState<string>('');
  const [telNumberMessage, setTelNumberMessage] = useState<string>('');
  const [authNumberMessage, setAuthNumberMessage] = useState<string>('');

  // state: 요양사 정보 메세지 에러 상태 //
  const [nameMessageError, setNameMessageError] = useState<boolean>(false);
  const [idMessageError, setIdMessageError] = useState<boolean>(false);
  const [paswordMessageError, setPaswordMessageError] = useState<boolean>(false);
  const [pasworCheckdMessageError, setPaswordCheckMessageError] = useState<boolean>(false);
  const [telNumberMessageError, setTelNumberMessageError] = useState<boolean>(false);
  const [authNumberMessageError, setAuthNumberMessageError] = useState<boolean>(false);

  // state: 입력값 검증 상태 //
  const [isCheckedId, setCheckedId] = useState<boolean>(false);
  const [isMatchedPassword, setMatchedPassword] = useState<boolean>(false);
  const [isCheckedPassword, setCheckedPassword] = useState<boolean>(false);
  const [isSend, setSend] = useState<boolean>(false);
  const [isCheckedAuthNumber, setCheckedAuthNumber] = useState<boolean>(false);

  // variable: 회원가입 가능 여부 //
  const isComplete = name && id && isCheckedId && password && passwordCheck && isCheckedPassword
    && telNumber && isSend && authNumber && isMatchedPassword && isCheckedAuthNumber;

  // function: 아이디 중복 확인 Response 처리 함수 //
  const idCheckResponse = (responseBody: ResponseDto | null) => {
        
    const message = 
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
        responseBody.code === 'DI' ? '이미 사용중인 아이디입니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'SU' ? '사용 가능한 아이디입니다.' : '';
    const isSuccessed = responseBody !== null && responseBody.code === 'SU';    
    setIdMessage(message);
    setIdMessageError(!isSuccessed);
    setCheckedId(isSuccessed);
    
    
      
  };
  
  // event handler: 이름 변경 이벤트 처리 //
  const onNameChangeHanedler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  // function: 전화번호 인증 Response 처리 함수 //
  const telAuthResponse = (responseBody: ResponseDto | null) => {

    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'VF' ? '숫자 11자 입력해주세요.' :
      responseBody.code === 'DT' ? '중복된 전화번호입니다.' :
      responseBody.code === 'TF' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'SU' ? '인증번호가 전송되었습니다.' : ''

      const isSuccessed = responseBody !== null && responseBody.code === 'SU';
      setTelNumberMessage(message);
      setTelNumberMessageError(!isSuccessed);
      setSend(isSuccessed);
  };

  // event handler: 아이디 변경 이벤트 처리 //
  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setId(value);
    setCheckedId(false);
    setIdMessage('');
  };

  // event handler: 비밀번호 변경 이벤트 처리 //
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

  // event handler: 비밀번호 변경 확인 이벤트 처리 //
  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPasswordCheck(value);


  };

  // event handler: 전화번호 변경 이벤트 처리 //
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

  // event handler: 인증번호 변경 이벤트 처리 //
  
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

  // event handler: 아이디 중복확인 클릭 이벤트 처리 //

  const onIdCheckClickHandler = () => {
    if (!id) return;

    const requestBody: IdCheckRequestDto = {
        userId: id
    };
    idCheckRequest(requestBody).then(idCheckResponse);
    
    
  };

  // event handler: 전화번호 인증 버튼 클릭 이벤트 처리 //

  const onTelNumberSendClickHandler = () => {
    if (!telNumber) return;

    const pattern = /^[0-9]{11}$/;
    const isMatched = pattern.test(telNumber);

    if (!isMatched) {
      setTelNumberMessage('숫자 11자리 입력해주세요.');
      setTelNumberMessageError(true);
      return
    }
    
    const requestBody: TelAuthRequestDto = { telNumber };
    telAuthRequestDto(requestBody).then(telAuthResponse);

    // setTelNumberMessage('인증번호가 전송되었습니다.');
    // setTelNumberMessageError(false);
    // setSend(true);

    // const isDuplicated2 = telNumber === '05120022222';
    // const message = isDuplicated2 ? '전화번호가 존재합니다' : '사용할 수 있는 전화번호 입니다.';
    // setTelNumberMessage(message);
    // setTelNumberMessageError(isDuplicated2);

  };

  // event handler: 인증 확인 버튼 클릭 이벤트 처리 //

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

  // event handler: 회원가입 버튼 클릭 이벤트 처리 //

  const onSignUpButtonHandler = () => {
    if (!isComplete) return;

    alert('회원가입 완료!');
  };

  // effect: 비밀번호 및 비밀번호 확인 변경시 실행할 함수 //
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

// component: 인증 화면 컴포넌트 //
export default function Auth() {

  // state: 선택 화면 상태 //
  const [path, setPath] = useState<AuthPath>('로그인');

  // event handler: 화면 변경 이벤트 처리 //
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

function IdCheckRequest(requestBody: IdCheckRequestDto) {
  throw new Error('Function not implemented.');
}
