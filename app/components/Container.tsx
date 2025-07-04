interface ContainerProps{
    children: React.ReactNode
}

const Container:React.FC<ContainerProps> = ({children}) => {
    return ( 
        <div className="
            max-w-[1220px] 
            mx-auto 
            x1:px-20 
            md:px-2 
            px-4"
        >
            {children}
        </div>
    );
}

export default Container;