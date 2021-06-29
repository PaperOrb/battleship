const useFetch = (url, initialValue) => { // implement this way of triggering useEffect in a test
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { loading, data };
};
function EffectsDemoCustomHook() {
  const { loading, data } = useFetch("https://jsonplaceholder.typicode.com/posts/");
  return (
    <div className="App">
      {loading && <div className="loader" />}
      {data?.length > 0 && data.map((blog) => <p key={blog.id}>{blog.title}</p>)}
    </div>
  );
}
