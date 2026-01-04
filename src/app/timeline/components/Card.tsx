import styles from '../Timeline.module.scss'
import Divider from './Divider';

const Card = ({ data }: { data: any }) => {
    return (
        <div className={styles.card}>
            <div className={styles.card_date}>
                <div>
                    <p>
                        {data.date_start}
                    </p>
                    <p>
                        {data.date_end}
                    </p>
                </div>
                <p>
                    {data.date_sum}
                </p>

            </div>
            <div className={styles.card_content}>
                <h3>{data.my_role}</h3>
                <a href={data.employer_link} target="_blank" rel="noopener noreferrer">
                    {data.employer_title}
                </a>
                <p>{data.employer_description}</p>
                <ul>
                    {data.my_responsbilities.map((el: string, index: number) => {
                        return <li key={index}> {el}</li>;
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Card;