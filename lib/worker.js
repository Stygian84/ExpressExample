module.exports = async function check(item) {
  //Our callback function
  const onChange = (data, sub) => {
    console.log(`${data.timeStamp}: ${sub.target} changed to ${data.value}`);

    //We can call sub.unsubscribe() here if we want
  };

  try {
    let subscription = await client.subscribe(item, onChange, 1000, false);

    console.log(`Subscribed to ${subscription.target}`);
  } catch (err) {
    console.log("Something failed:", err);
    return;
  }
};