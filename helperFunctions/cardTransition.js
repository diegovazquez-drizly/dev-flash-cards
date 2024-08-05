export default function cardTransition(parentRef, childRef, setCardData, data) {
  parentRef.current.style.height = "100%";
  setTimeout(() => {
    if (childRef?.current?.style) {
      childRef.current.style.display = "flex";
    }
    setCardData(data);
  }, 760);
}

export function disableButton(ref) {
  ref.current.style.pointerEvents = "none";
  return ref;
}

export function hideParent(ref) {
  ref.current.style.height = "0px";
}
