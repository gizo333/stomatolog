import '../styles/WelcomePage.css'
import hero from '../img/hero-img.png'


const WelcomePage = () => {

    return(
        <section className='welc-cont'>
        <div className='welc-text'>
            <h1 className='welc-h1' >Клиника Дент-ИСТ —
                стоматология по мировым
                 стандартам в Москве</h1>
                 <button className='welc-but'>Записаться на прием</button>
                
        </div>
        
        <div className='welc-img'>
            <img className='hero-img' src={hero} alt="" />
        </div>
        </section>
    );
}


export default WelcomePage;