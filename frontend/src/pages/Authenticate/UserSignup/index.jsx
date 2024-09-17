import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./usersignup.css";
import { toast } from "react-toastify";
import IdContext from "../../../context/IdContext";

const SignUp = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const error = queryParams.get('error');

    if (error === 'account_does_not_exist') {
      toast.error("You don't have an account Please Register")
    }
  }, [location]);

  const [showReg, setReg] = useState([]);
  const navigate = useNavigate();
  const {setRegisterId} = useContext(IdContext)
  const [gmailOTPSent,setGmailOTPSent]=useState(false)
  const [gmailOTPVerified,setGmailOTPVerified] = useState(false)
  const [phoneNumberOtpSent,setPhonePhoneNumberOtpSent]=useState(false)
  const [phoneNumberOTPVerified,setPhoneNumberOTPVerified] = useState(false)


  // const [res, setRes] = useState();
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    emailCode: "",
    password: "",
    confirmPassword: "",
    phno: "",
    phoneOTP: "",
  });

  const dataChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };


  const generateGmailOtp = async () => {
    console.log(signupData.email);
    const email = signupData.email
    if(!email){
      toast.error('Please enter your email')
    }
    try {
      const response = await axios.post('http://localhost:8003/api/auth/generate-otp', { email })
      console.log(response);
      if(response.data.message === "OTP sent successfully"){
        setGmailOTPSent(true)
        toast.success('OTP sent successfully to your email');
      }else{
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const verifyGmailOtp = async () => {
    const { email, emailCode: otp } = signupData;
  
    if (!otp) {
      toast.error('Please enter your Gmail OTP');
      return; 
    }
  
    if (!gmailOTPSent) {
      toast.error("You didn't generate your email code");
      return; 
    }
  
    try {
      const response = await axios.post('http://localhost:8003/api/auth/verify-gmail-otp', { email, otp });
      
      if (response.data.message === 'OTP verified successfully') {
        setGmailOTPVerified(true);
        toast.success('OTP verified successfully');
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Invalid gmail OTP');
    }
  };
  

  const sendOtp = async() => {
    const phoneNumber = `+91${signupData.phno}`;
    try {
      const response = await axios.post('http://localhost:8003/api/auth/send-otp', { phoneNumber });
      console.log(response.data);
      if (response.data.message === 'OTP send successfully') {
        setPhonePhoneNumberOtpSent(true)
        toast.success('OTP sent successfully');
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Please give the phone number');
      console.error('OTP sending error:', error);
    }
  };

  const verifyOtp = async () => {
    console.log(signupData.phno);
    
    const phoneNumber = `+91${signupData.phno}`;
    const otp = signupData.phoneOTP 
    if(!otp){
      toast.error('Please enter OTP ')
      return
    }
    if(!phoneNumberOtpSent){
      toast.error(`You didn't generate your Phone number verification code `)
      return
    }
    try {
      const response = await axios.post('http://localhost:8003/api/auth/verify-otp', { phoneNumber, otp });
      console.log(response);
      if (response.data.message === 'Verification successful') {
        setPhoneNumberOTPVerified(true)
        toast.success('OTP verified successfully');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
      console.error('OTP verification error:', error);
    }
  };

  // const validateForm = () => {
  //   const {
  //     firstName,
  //     lastName,
  //     username,
  //     email,
  //     password,
  //     confirmPassword,
  //     phno,
  //   } = signupData;

  //   if (!firstName || !lastName || !username || !email || !password || !confirmPassword || !phno) {
  //     toast.error("Please fill in all required fields");
  //     return false;
  //   }

  //   if (password !== confirmPassword) {
  //     toast.error("Passwords do not match");
  //     return false;
  //   }

  //   return true;
  // };

  const registration = async () => {
    const { firstName, lastName, username, email, password, confirmPassword, phno } = signupData;
    if (!firstName) {
      toast.error("Please fill the firstname");
      return; // Stop further execution if validation fails
    }
    
    if (!lastName) {
      toast.error("Please fill the lastname");
      return;
    }
  
    if (!username) {
      toast.error("Please fill the username");
      return;
    }
  
    if (!email) {
      toast.error("Please fill the email");
      return;
    }
  
    if (!password) {
      toast.error("Please fill the password");
      return;
    }
  
    if (!confirmPassword) {
      toast.error("Please fill the confirm password");
      return;
    }
  
    if (!phno) {
      toast.error("Please fill the phone number");
      return;
    }

    if (!gmailOTPVerified) {
      toast.error("Please verify OTP for your email");
      return;  
    }
  
    if (!phoneNumberOTPVerified) {
      toast.error("Please verify OTP from your phone number");
      return;  
    }
  
    try {
      
      const { emailCode, phoneOTP, ...otherDetails } = signupData;
      console.log(otherDetails);
    
      
      const response = await axios.post('http://localhost:8003/api/auth/register', otherDetails, { withCredentials: true });
      const userId = response.data.user;
      console.log(response.data);
    
      
      if (response.data.message === 'User already exists') {
        toast.error('Email is already taken');
      } else if (response.data.message === 'Passwords do not match') {
        toast.error('Passwords do not match');
      } else if (response.status === 201) {
        toast.success('User registered successfully');
        setRegisterId(userId);  
        navigate(`/registration/${userId}`);  
      }
    } catch (error) {
     
      if (error.response) {
       
        console.error('Response error data:', error.response.data);
        console.error('Response error status:', error.response.status);
        console.error('Response error headers:', error.response.headers);
    
        
        toast.error(error.response.data.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        
        console.error('Request error data:', error.request);
        toast.error('No response from server. Please try again.');
      } else {
        
        console.error('Error message:', error.message);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };
  


  return (
    <div className="anoop3">
      <div className="data">
        <h3>Sign up</h3>
        <div className="insert">

          <label htmlFor="">
            First Name <input type="text" name="firstName" onChange={dataChange} required/>
            <span style={{ color: "red" }}>{showReg}</span>
          </label>

          <label htmlFor="">
            Last Name <input type="text" name="lastName" onChange={dataChange} required/>
            <span style={{ color: "red" }}>{showReg}</span>
          </label>

          <label htmlFor="">
            Username{" "}
            <input type="text" name="username" onChange={dataChange} required/>
            <span style={{ color: "red" }}>{showReg}</span>
          </label>

          <div className="footer22">
            <label htmlFor="">
              email{" "}
              <input type="email" name="email" onChange={dataChange}/>
              <span style={{ color: "red" }}>{showReg}</span>
            </label>

            <div className="Otp">

              <button onClick={generateGmailOtp} className="link-button">
                Generate OTP <i className="fa-solid fa-arrows-rotate" style={{ color: 'rgb(152, 18, 188)' }}></i>
              </button>
              <i className="fa-regular fa-circle-check" style={{ color: 'rgb(152, 18, 188)' }}></i>
            </div>
          </div>

          <div className="footer22">
            <label htmlFor="">
              email verify code{" "}
              <input type="text" name="emailCode" onChange={dataChange} />
              <span style={{ color: "red" }}>{showReg}</span>
            </label>

            <div className="Otp">

              <button className="link-button" onClick={verifyGmailOtp}>
                Verify OTP
              </button>
              <i className="fa-regular fa-circle-check" style={{ color: 'rgb(152, 18, 188)' }}></i>
            </div>

          </div>


          <label htmlFor="">
            Password{" "}
            <input type="password" name="password" onChange={dataChange} />
          </label>

          <label htmlFor="">
            ConfirmPassword{" "}
            <input
              type="password"
              name="confirmPassword"
              onChange={dataChange}
            />
          </label>

          <label htmlFor="">
            Mobile <input lang="en-US" type="number" name="phno" onChange={dataChange} />
          </label>

          <div className="footer22">
           <div className="Otp">
              <button onClick={sendOtp} className="link-button">
                send OTP
                <i className="fa-solid fa-arrows-rotate" style={{ color: 'rgb(152, 18, 188)' }}></i>
              </button>
              <i className="fa-regular fa-circle-check" style={{ color: 'rgb(152, 18, 188)' }}></i>
           </div>

            <label htmlFor="">
              OTP <input type="number" name="phoneOTP" onChange={dataChange} />{" "}
            </label>
            <div className="Otp">
              <button onClick={verifyOtp} className="link-button">
                verify OTP
              </button>
              <i className="fa-regular fa-circle-check" style={{ color: 'rgb(152, 18, 188)' }}></i>
           </div>


            <button className="up" onClick={registration}>
              Register
            </button>
            <button className="up2">Social media login</button>
            <p className="p4">
              Allready have an account?
              <a className="a3" href="/login">
                Log In
              </a>{" "}
            </p>
          </div>

          <br />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
