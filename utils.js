const commandText = msg => {
	  let text = msg.args(2);
	  text = text.join(' ');
	  return text;
};
