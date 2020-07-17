function copy(ref) {
    ref.select();
    ref.setSelectionRange(0, 99999)
    document.execCommand("copy");
}
export default copy
