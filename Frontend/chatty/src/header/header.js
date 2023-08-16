import './header.css'

export const Header = () =>{


    return (

        <div className='header_container'>
            <h3>Chat App by  <em> Naman</em> </h3> 
            <a className='header_item' href='/join'> <em>Join Us!</em> </a>
            <a className='header_item' href='/login'> <em>Login</em> </a>
            <a className='header_item' href='/'> <em>Browse</em> </a>
        </div>


    );
}