  function showError(msg) {
      const errorDiv = document.getElementById('errorMsg');
      errorDiv.textContent = msg;
      errorDiv.classList.add('show');
      document.getElementById('result').classList.remove('show');
      document.getElementById('result').textContent = '';
    }
    function clearError() {
      const errorDiv = document.getElementById('errorMsg');
      errorDiv.classList.remove('show');
      errorDiv.textContent = '';
    }
    function showResult(msg) {
      const resultDiv = document.getElementById('result');
      resultDiv.textContent = msg;
      resultDiv.classList.add('show');
    }
    function clearResult() {
      const resultDiv = document.getElementById('result');
      resultDiv.classList.remove('show');
      resultDiv.textContent = '';
    }
    function convertTemperature(value, from, to) {
      let temp = parseFloat(value);
      if (from === to) return temp;
      if (from === 'F') temp = (temp - 32) * 5/9;
      else if (from === 'K') temp = temp - 273.15;
      if (to === 'F') return (temp * 9/5) + 32;
      if (to === 'K') return temp + 273.15;
      return temp;
    }
    document.getElementById('convertBtn').onclick = function() {
      clearError();
      clearResult();
      const value = document.getElementById('tempInput').value.trim();
      const from = document.getElementById('fromUnit').value;
      const to = document.getElementById('toUnit').value;
      if (!value) return showError('Please enter a temperature value.');
      if (isNaN(value)) return showError('Temperature must be a valid number.');
      if (!from) return showError('Please select the input unit.');
      if (!to) return showError('Please select the output unit.');
      if (from === to) return showError('Please select different units for conversion.');
      if (from === 'K' && parseFloat(value) < 0) return showError('Kelvin cannot be negative.');
      if (from === 'C' && parseFloat(value) < -273.15) return showError('Celsius cannot be below -273.15.');
      if (from === 'F' && parseFloat(value) < -459.67) return showError('Fahrenheit cannot be below -459.67.');
      const result = convertTemperature(value, from, to);
      let unitSymbol = to === 'C' ? '°C' : (to === 'F' ? '°F' : 'K');
      showResult(`${parseFloat(value)} ${from} = ${result.toFixed(2)} ${unitSymbol}`);
    };