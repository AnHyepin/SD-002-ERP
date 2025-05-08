import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        gender: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        email: '',
        phoneNumber: '',
        agreeTerms: false
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});
    const [isIdAvailable, setIsIdAvailable] = useState(false);
    const [isEmailAvailable, setIsEmailAvailable] = useState(false);
    const [isPhoneAvailable, setIsPhoneAvailable] = useState(false);
    const navigate = useNavigate();

    const validateUsername = (username) => {
        if (/\s/.test(username)) return "아이디에 공백이 포함될 수 없습니다.";
        if (username.length < 8 || username.length > 20) return "아이디는 8자 이상, 20자 이하여야 합니다.";
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(username))
            return "아이디는 영문과 숫자를 조합해서 사용해야합니다.";
        if (/(\w)\1\1/.test(username)) return "아이디에 연속된 동일 문자/숫자가 3번 이상 포함될 수 없습니다.";
        return null;
    };

    const validatePassword = (password) => {
        const hasLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);
        const hasNoContinuous = !/(.)\1{2,}/.test(password);

        return {
            hasLength,
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialChar,
            hasNoContinuous
        };
    };

    const handleIdCheck = async () => {
        const error = validateUsername(formData.username);
        if (error) {
            setErrors(prev => ({...prev, username: error}));
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/api/users/check-duplicate-username?username=${formData.username}`);
            if (response.data.duplicate) {
                setErrors(prev => ({...prev, username: "이미 사용 중인 아이디입니다."}));
                setIsIdAvailable(false);
            } else {
                setErrors(prev => ({...prev, username: null}));
                setIsIdAvailable(true);
            }
        } catch (error) {
            console.error("아이디 중복 확인 실패:", error);
        }
    };

    const handleEmailCheck = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setErrors(prev => ({...prev, email: "올바른 이메일 형식을 입력하세요."}));
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/api/users/check-duplicate-email?email=${formData.email}`);
            if (response.data.duplicate) {
                setErrors(prev => ({...prev, email: "이미 사용 중인 이메일입니다."}));
                setIsEmailAvailable(false);
            } else {
                setErrors(prev => ({...prev, email: null}));
                setIsEmailAvailable(true);
            }
        } catch (error) {
            console.error("이메일 중복 확인 실패:", error);
        }
    };

    const handlePhoneCheck = async () => {
        const phoneRegex = /^01[0|1|6|7|8|9]-?\d{3,4}-?\d{4}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            setErrors(prev => ({...prev, phoneNumber: "올바른 휴대전화 번호를 입력하세요."}));
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/api/users/check-duplicate-phoneNumber?phoneNumber=${formData.phoneNumber}`);
            if (response.data.duplicate) {
                setErrors(prev => ({...prev, phoneNumber: "이미 사용 중인 휴대전화 번호입니다."}));
                setIsPhoneAvailable(false);
            } else {
                setErrors(prev => ({...prev, phoneNumber: null}));
                setIsPhoneAvailable(true);
            }
        } catch (error) {
            console.error("휴대전화 번호 중복 확인 실패:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isIdAvailable || !isEmailAvailable || !isPhoneAvailable) {
            alert("아이디, 이메일, 휴대전화 번호 중복 확인이 필요합니다.");
            return;
        }

        if (!formData.agreeTerms) {
            alert("이용약관에 동의해주세요.");
            return;
        }

        if (formData.password !== formData.passwordConfirm) {
            setErrors(prev => ({...prev, passwordConfirm: "비밀번호가 일치하지 않습니다."}));
            return;
        }
        const dataToSend = { ...formData };
        delete dataToSend.passwordConfirm;
        try {
            await axios.post('http://localhost:8000/api/users/regist-user', formData);
            alert("회원가입이 완료되었습니다.");
            navigate('/login');
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="register-page-container">
            <div className="register-form-box">
                <h2 className="register-title">회원가입</h2>
                <Link to="/" className="register-close-button">×</Link>
                {/* <p className="register-subtitle">공급빵빵</p> */}

                <form onSubmit={handleSubmit}>
                    <div className="register-form-group margin-top-45">
                        <div className="register-label">아이디</div>
                        <div className="register-id-input-box">
                            <input
                                className="register-input"
                                type="text"
                                placeholder="아이디"
                                value={formData.username}
                                onChange={(e) => {
                                    setFormData(prev => ({...prev, username: e.target.value}));
                                    setIsIdAvailable(false);
                                }}
                                required
                            />
                            <button className="register-button" type="button" onClick={handleIdCheck}>중복확인</button>
                        </div>
                        {errors.username && <div className="register-error-message">{errors.username}</div>}
                        {isIdAvailable && <div className="register-success-message">사용 가능한 아이디입니다.</div>}
                    </div>

                    <div className="register-form-group">
                        <div className="register-label">비밀번호</div>
                        <input
                            className="register-input"
                            type="text"
                            placeholder="비밀번호"
                            value={formData.password}
                            onChange={(e) => {
                                setFormData(prev => ({...prev, password: e.target.value}));
                                const validation = validatePassword(e.target.value);
                                setErrors(prev => ({
                                    ...prev,
                                    password: !Object.values(validation).every(Boolean)
                                }));
                            }}
                            required
                        />
                        <div className="register-password-requirements">
                            <span className={formData.password.length >= 8 ? 'valid' : ''}>• 8자 이상</span>
                            <span className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>• 대문자 포함</span>
                            <span className={/[a-z]/.test(formData.password) ? 'valid' : ''}>• 소문자 포함</span>
                            <span className={/[0-9]/.test(formData.password) ? 'valid' : ''}>• 숫자 포함</span>
                            <span className={/[!@#$%^&*]/.test(formData.password) ? 'valid' : ''}>• 특수문자 포함</span>
                            <span
                                className={!/(.)\1{2,}/.test(formData.password) ? 'valid' : ''}>• 3자 이상 연속된 문자 사용 불가</span>
                        </div>
                    </div>

                    <div className="register-form-group">
                        <div className="register-label">비밀번호 확인</div>
                        <input
                            className="register-input"
                            type="text"
                            placeholder="비밀번호 확인"
                            value={formData.passwordConfirm}
                            onChange={(e) => setFormData(prev => ({...prev, passwordConfirm: e.target.value}))}
                            required
                        />
                        {errors.passwordConfirm &&
                            <div className="register-error-message">{errors.passwordConfirm}</div>}
                    </div>

                    <div className="register-form-group">
                        <div className="register-label">이름</div>
                        <div className="register-name-gender-box">
                            <input
                                className="register-input"
                                type="text"
                                placeholder="이름"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                                required
                            />
                            <select
                                className="register-select"
                                value={formData.gender}
                                onChange={(e) => setFormData(prev => ({...prev, gender: e.target.value}))}
                                required
                            >
                                <option value="">성별</option>
                                <option value="M">남성</option>
                                <option value="F">여성</option>
                            </select>
                        </div>
                    </div>

                    <div className="register-form-group">
                        <div className="register-label">생년월일</div>
                        <div className="register-birth-box">
                            <select
                                className="register-select"
                                value={formData.birthYear}
                                onChange={(e) => setFormData(prev => ({...prev, birthYear: e.target.value}))}
                                required
                            >
                                <option value="">년</option>
                                {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <select
                                className="register-select"
                                value={formData.birthMonth}
                                onChange={(e) => setFormData(prev => ({...prev, birthMonth: e.target.value}))}
                                required
                            >
                                <option value="">월</option>
                                {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                            <select
                                className="register-select"
                                value={formData.birthDay}
                                onChange={(e) => setFormData(prev => ({...prev, birthDay: e.target.value}))}
                                required
                            >
                                <option value="">일</option>
                                {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="register-form-group">
                        <div className="register-label">이메일</div>
                        <div className="register-id-input-box">
                            <input
                                className="register-input"
                                type="email"
                                placeholder="이메일"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData(prev => ({...prev, email: e.target.value}));
                                    setIsEmailAvailable(false);
                                }}
                                required
                            />
                            <button className="register-button" type="button" onClick={handleEmailCheck}>중복확인</button>
                        </div>
                        {errors.email && <div className="register-error-message">{errors.email}</div>}
                        {isEmailAvailable && <div className="register-success-message">사용 가능한 이메일입니다.</div>}
                    </div>
                    

                    <div className="register-form-group">
                        <div className="register-label">휴대전화</div>
                        <div className="register-id-input-box">
                            <input
                                className="register-input"
                                type="tel"
                                placeholder="휴대전화 번호"
                                value={formData.phoneNumber}
                                onChange={(e) => {
                                    setFormData(prev => ({...prev, phoneNumber: e.target.value}));
                                    setIsPhoneAvailable(false);
                                }}
                                required
                            />
                            <button className="register-button" type="button" onClick={handlePhoneCheck}>중복확인</button>
                        </div>
                        {errors.phoneNumber && <div className="register-error-message">{errors.phoneNumber}</div>}
                        {isPhoneAvailable && <div className="register-success-message">사용 가능한 휴대전화 번호입니다.</div>}
                    </div>

                    <label className="register-agree-box">
                        <input
                            type="checkbox"
                            checked={formData.agreeTerms}
                            onChange={(e) => setFormData(prev => ({...prev, agreeTerms: e.target.checked}))}
                        />

                        <span>이용약관에 동의합니다.</span>
                    </label>

                    <button className="register-button" type="submit">가입하기</button>
                </form>
            </div>
        </div>
    );
};
export default Register; 