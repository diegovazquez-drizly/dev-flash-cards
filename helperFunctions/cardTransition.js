export default function cardTransition(parentRef, childRef, setCardData, data) {
  parentRef.current.style.height = "500px";
  setTimeout(() => {
    (childRef.current.style.display = "flex"), 760;
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

