export default function cardTransition(parentRef, childRef, setCardData, data) {
  parentRef.current.style.height = '100vh';
  parentRef.current.style.minHeight = '100%';
  setTimeout(() => {
    window.location.href = '#card';
    childRef.current.style.display = 'flex', 760;
    setCardData(data)
  }, 760);
}

export function disableButton(ref) {
  ref.current.style.pointerEvents = 'none';
  return ref;
}

export function hideParent(ref) {
  ref.current.style.height = '0px';
}