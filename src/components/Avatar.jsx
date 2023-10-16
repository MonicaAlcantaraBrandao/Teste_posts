import styles from './Avatar.module.css'
export function Avatar({ hasBorder = true, src }) {

  return ( /*if ? else :*/
    <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={src} />

  );
}


// const hasBorder = props.hasBorder != false


//   return ( /*if ? else :*/
//     <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={props.src} />
