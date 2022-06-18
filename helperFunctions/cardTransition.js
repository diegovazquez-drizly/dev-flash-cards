export default function cardTransition(parentRef, childRef, setCardData, data) {
  //if (!parentRef.current) return console.log('parent not mounted');
  //if (!childRef.current) return console.log('child not mounted');
  // console.log(parentRef.current, childRef.current);
  parentRef.current.style.height = "500px";
  //childRef.current.style.display = 'none';
  setTimeout(() => {
    (childRef.current.style.display = "flex"), 760;
    setCardData(data);
  }, 760);
}

export function disableButton(ref) {
  ref.current.style.pointerEvents = "none";
  //ref.current.style.display = 'none';
  return ref;
}

export function hideParent(ref) {
  ref.current.style.height = "0px";
}
