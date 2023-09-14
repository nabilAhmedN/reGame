const { useEffect } = require("react")

const useTitle = (PageTitle) => {
    useEffect(() => {
        document.title = PageTitle;
    }, [PageTitle])
}

export default useTitle;