import styles from "@/styles/Button.module.css"

interface Props {
  children?: preact.ComponentChildren
  onClick?: (e:MouseEvent) => any
  id?: string
  className?: string
  target?: string
  url: string
}

export default function Button({ children, onClick, url, target,  className, ...rest }:Props) {
  return (     
    <a
      href={url}
      target={`${target ?? '_blank'}`}
      rel="noopener noreferrer"
      onClick={onClick}
      class={`
        lg:text-md
        md:px-5
        md:text-xl
        w-fit
        text-center
        font-medium
        no-underline
        px-6
        py-1
        border
        border-solid
        border-white
        rounded-full
        ${styles.button}
        ${className ?? ''}`
        }
      {...rest}
    >
      {children}
    </a>
  )
}