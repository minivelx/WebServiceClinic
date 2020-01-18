using System;
using System.Collections;
using System.Collections.Generic;

namespace WebServiceClinic
{
    public class ErrorModelValidation
    {
        public static string ShowError(Dictionary<string, object>.ValueCollection ErrorCollection)
        {
            List<string> lstErrors = new List<string>();

            foreach (var item in ErrorCollection)
            {
                if (item is IEnumerable)
                {
                    var listError = item as ICollection;
                    foreach (string error in listError)
                    {
                        lstErrors.Add(error);
                    }
                }
                else
                {
                    lstErrors.Add(item.ToString());
                }
            }

            return string.Join(". " + Environment.NewLine, lstErrors);
        }
    }
}
