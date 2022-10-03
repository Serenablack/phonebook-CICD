const Filter = ({ Namefilter, namefilter }) => {
  return (
    <div>
      filter contact with name:
      <input value={Namefilter} onChange={namefilter} />
    </div>
  );
};
export default Filter;
