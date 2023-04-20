import './About.css';
import Navbar from '../../components/Navbar/Navbar';

export default function About(){
    return(
        <>
        <Navbar />
        <div className="container-about">
            <h1>About the Team</h1>
            <div className='team-members'>
                <img className="img" src="https://simg.nicepng.com/png/small/933-9332131_profile-picture-default-png.png" 
                    alt="Profile"
                />
                <div className="description-txt">
                    <h3>Maximillian Chalitsios</h3>
                    <p>Is a skilled full-stack web developer with expertise in building web applications in various contexts. He brings a wealth of experience to our team and is a valuable contributor to our post office project.
                    </p>
                </div>
            </div>
            <div className='team-members'>
                <img className="img" src="https://simg.nicepng.com/png/small/933-9332131_profile-picture-default-png.png" 
                    alt="Profile"
                />
                <div className="description-txt">
                    <h3>Noah Morton</h3>
                    <p>[Description]</p>
                </div>
            </div> 
            <div className='team-members'>
                <img className="img" src="https://simg.nicepng.com/png/small/933-9332131_profile-picture-default-png.png" 
                    alt="Profile"
                />
                <div className="description-txt">
                    <h3>Anh Nhu Nhan Nguyen</h3>
                    <p>[Description]</p>
                </div>
            </div> 
            <div className='team-members'>
                <img className="img" src="https://simg.nicepng.com/png/small/933-9332131_profile-picture-default-png.png" 
                    alt="Profile"
                />
                <div className="description-txt">
                    <h3>Nicole Phan</h3>
                    <p>[Description]</p>
                </div>
            </div>      
        </div>
        </>
    );
}