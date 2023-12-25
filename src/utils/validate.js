const REGEX = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};

const validate = (rules, values) => {
  let errObj = {};

  for (const ruleKey in rules) {
    for (const rule of rules[ruleKey]) {
      // Case: required
      if (rule.required) {
        // Check required
        if (!!!values[ruleKey]) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập thông tin";
          break;
        }
      }

      // Case Regex
      if (rule.regrex && values[ruleKey]) {
        let pattern = "";
        if (rule.regrex in REGEX) {
          pattern = REGEX[rule.regrex];
        } else if (rule.regrex instanceof RegExp) {
          pattern = rule.regrex;
        } else {
          pattern = new RegExp(rule.regrex, "gi");
        }

        // Check Regrex
        if (!pattern.test(values[ruleKey])) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập đúng định dạng";
          break;
        }
      }
    }
  }
  return errObj;
};

export const requireRule = (message) => {
  return {
    required: true,
    message,
  };
};

export const regrexRule = (regrex, message) => {
  return {
    regrex,
    message,
  };
};

export default validate;
