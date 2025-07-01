import { IconType } from 'react-icons'

interface StatusProps{
    icon: IconType
    text: string
    bg: string
    color: string
}

const Status: React.FC<StatusProps> = ({ bg, color, text, icon: Icon }) => {
    return(
        <div className={`
            ${bg} 
            ${color}
            px-1
            rounded
            flex
            items-center
            gap-1
        `}>
            {text} <Icon size={16}/>
        </div>
    )
}
export default Status