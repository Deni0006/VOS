const DEFAULT_VALUES={name:'',email:'',message:''}

function Cantacts() {
const [values, setValues] = React.useState(DEFAULT_VALUES);

const onChange = ({target}) => setValues(state=>({...state, [target.name]:target.value}));

const onSubmit = (e) => {
    e.preventDefault();
    axios.post("https://express-js2.herokuapp.com/submit", {
        name,
        email,
        message,
    })
        .then(() => {
            alert("Your message has been send");
        });
};

return (
    <div className={styles.block} id="Contacts">
        <Fade bottom>
            <div className={styles.wrapper}>
                <h2 className={styles.myCantact}>Напишите мне</h2>
                <div className={styles.line}></div>

                <form onSubmit={onSubmit} className={styles.form}>
                    <input 
                       type="text" 
                       name="name"
                       value={values.name}
                       placeholder="Name" 
                       onChange={onChange}
                    />
                    <input
                        type="text"
                        size="40px"
                        name="email"
                        value={values.email}
                        placeholder="Email"
                        onChange={onChange}
                    />
                    <textarea
                        rows="10"
                        cols="60"
                        name="message"
                        value={values.message}
                        onChange={onChange}
                        placeholder="Your message"
                    />
                    <button className={styles.send} >
                       Отправить
                    </button>
                </form>
            </div>
        </Fade>
    </div>);
}