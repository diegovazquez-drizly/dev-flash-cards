export default function cardTransition(parentRef, childRef, dispatch, data) {
  parentRef.current.style.height = '100vh';
  parentRef.current.style.minHeight = '100%';
  setTimeout(() => {
    window.location.href = '#card';
    childRef.current.style.display = 'flex', 760;
    dispatch({type: 'setCardData', payload: data})
  }, 760);
}