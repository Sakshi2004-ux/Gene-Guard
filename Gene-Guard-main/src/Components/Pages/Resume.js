import React from "react";
import "./Resume.css";

const HERO_IMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAE2AcEDASIAAhEBAxEB/8QAHQAAAAcBAQEAAAAAAAAAAAAAAAECAwQFBgcICf/EAFcQAAEDAgMDBQkJDAYKAwEBAAEAAgMEEQUGIRIxQQcTUWGRFBUiU1RxgZLRCBYyQlJVk6GxFyMkMzREcoKUosHhNUNFYoOyGCUmNkZkc3SE8FZj0qPC/8QAGwEAAgMBAQEAAAAAAAAAAAAAAAECAwQFBgf/xAA1EQACAQMBBwIFAgYCAwAAAAAAAQIDBBESBRMUITFBUQZSIiMyYXEVQhYkMzRTgWKxQ5Gh/9oADAMBAAIRAxEAPwD0qgj2UNldswibJNk5sobKeRCELoyERGqYBIIwEdk8iEFEUshJI1QJiDoiuehKIRKSEFfqRXCUdyQRqmALoXQsisgiGgUEAFIAtlCyVZFZAgIwECEQujIxSHBBBIArI0EYCXQAkVkq10NlGQBZCyOyNRyAWyjASkEZGgDejsiG9KASGFZC1koBGRZGRpiQjARtSgFFjBs9SGz1JSCRIKyKyVZCyGAQ0RoWR286WQEoJQCOyMhgQEdkoBHZGR4EWQsl2QslkBFkRGqcsiI1RkMCdnqQ2epOWRWRkMCC3qRbPUnLIbKMhgRZBOWQRkMDVkLJdkLJ5E0IshZLsjsEZBIaskluqkiLabcFJ5og70tQ8DGyULFOEaojbipLmJoaKTZOEJLhYKSZBiCNUVupGXNG8hNumYOJU0mIU7QJJSHTXGgTfOOUlHJFse9CPZPQoxkddJ2n/KPapKmRySiDxCFupRHF/wAo9qIOePjHtRoBMmIlGEjuKUJSEaGDZIQ4Jlsw6EsSNI6EnAaY4giDmkXujFksDyCyPgggoMAwjRBC6QgwjRBKAQNINHZADpR3YN7h2oJYCsgEh0rAdHBASs6bowIdCUE0JoutKE0XC6TRJCwNUqySJWE70trmniFF8iXIKyFilaI7JZJJCUEqyFupLIYCCVZG0dSUG9SWR4EAI7JeyhsoyAgDVK2UYajSyAmyGz1Iyj14IDAnZRFuqdG5EQlkaG7IAJwDrQsjIMQB1JVkdupABJsMBbJQSrdaCjkBiyGylhpSwBxU2wGbIAXTxYDwQa0g7knLCGkLihl2SBGbJvuWpJ+A4BXUJHNN8yXcAalZd/IsUEUckD9mzWG/FR6hjo27TxYDrWma1lr7IQdHE5tnRMI6wEK5aB0zGPqmAaA3Ud07nHS625pqXjTxn9UI+5qW2lNEP1QrlexXYrdFvmYRziTx7Em/nW7NNT3/ABEfqodzU/iI/VCmtoLwRdBswheBxCQZB0hb8U9LxpovUCBpqTyaL1An+oL2i4WRz4ytvwuj279C3/c1J5ND6gQ7lpPJYfUCa2gvAcLLyYAu6wgHeZb/ALlpPJYfUCHctJ5ND6gR+oL2hwsvJgLjpCIuG8ldA7lpPJofUCHctL5ND6gR+oLwHDSOfiRvWjMjTuut+KWl8mh9QJXctL5PF6gR+oL2i4aRz0PtoCQjErgdCVvzSU1/xEXqBZnN1LBTyRTRtDDISCBu0VtC8jVnpaIzouCyVQqXAagFOd0tt8FQwULre6aMupk5tUzoKBqmD4pKg3Quo7pDUiWas8GJLqqUfBNlHuhdCpoetjjppXb3lJBPEk+dIultKk4oWpjjT5ktpTIOqWCoaR5HmuSrppp0SwoNDUmKBN0Z1N9UBuRhQaJZFRPew+CSn2TuB11TDUtQcUSUmSmzNJtuTgII0UFKa9wOhUHDwWKRPbvSwosUwOjtFLYARfeqpLBNMCCMCyCiMIorJSPZCMhgbsSlC9krZR2STGhIQS7IWSyMQjASrIWQITZCyVZCyQwkEdkExDRFtyTqNUtJIUhAD3X3JL5tl3heCET52xM6SoFRIZngnRTjDPUi5YLY1LiRzbvBsgZpN5dp51VXPAlE5zvlFDpJElUbNjH+LYb3uAqjM+KTYbDFzDGudI63hbgFaUv5NH+iFnM+/i6X9I/YsVCCnVSZZVk4020RGZtrWRkOpYpXHdYkJLM41dtaGIEGxBeb/Ys+6+ybAk20A3k8LK/xbDIpcJ75tjNNO0WnY7QOPUurVoW9OSTXU59OpVlFyTJ+DZlnxDE46WSmjja+/hNdc/YtHVSOhpnShu1s8FgcotIx6n0+V9i6DUERsL3C44hc+9pxp1cRXI2W03OOWyn78P407h6f5Id+HeIPb/JTDWQeKPYi7upvEA+hVLGPpLufkh9+XeIPb/JH35d4g9p9il93Uvk47EO7qbxH1I5e0Tb9xE78O8Qe0+xDvw7xB7T7FL7upvEfUh3dTeIHYj4faLD8kTvw7xB7T7EO/DvJz9fsUzu+l8R9SHd9N4n91Hw+0eJeSIMYkt+Tj6/Yh33l8Q36/YpffCm8T+6j74Ux05r91ReOyBavI5STmogbKW7N+Cz2fXbMVF0l7vsWkhkEjbsaQ3zLMcoZ2WUF/lu+wK2z514kbh4pMzzCLJVwmGPFke0F6LGTlpj1whdNByUHJYDIu6F0m6F+hGAyKulNKbulBJoBwHVLB1TI3pQOqg0SRICW1MNcnGlVtEkx4HRGCE2DojB0UcDyOhLTLXJYkUGiaFpQCQ119UvaCj0JBgap6KVzXDXRMhKG9VyWSSZYRPDxcJahROLTopMUm0Nd6oki1DiOyACOygSCsjAQslBGR4E2RgaJVtEEkIKyFkaNuqTYCbIWS9OhA2snkkkIsgj0QRkNJGd1KLUz7OgQqJyDZhUR2u9aoR8lEpBOftG5KA+EEh29Fe2quwV5JocLJL3DoUYy2CZlqdm5teyg4sMm6p/yeP8ARCzueheKmP8AeP2K+oJGy0UD27iwJc8bJWhsjGuHQQuVTm6dTV4Nso64YOaRvfBM2Vhs9huEdVVVNUfwieR44AnQLo7IYmN2WxtA8yUIo7X2G+quhLaOZZcTJG0a5JmDyqR74qfp1+xdCe4NYXO3JtrGNIIa0W4gJTvC0OoWG4r76erBpo0lTWEMOrKcaWPqou7KX/0Jwww+KZ2Iu54fFM7FSmu5ZiTEd2Uv/oRd20g0/gnO54fFM7EoU8G8wsv5k8xDDCgmhnF4wD6E5ZvyR2IRxxxizGht0pQf2HhhWb8kdiLZb8kdiUglzGFst+SOxFst6B2JSIHVIeMACyXKT+Lw/wD6jvsWu0WQ5SCDFQjiJHH0WW2xXz4me6/pszDPgpSRGdEtekwcjsGEoJF0A4dKXPwNDqATW2ja/rRhgPcEbUgOHSjDtd6THlIcCMJIKUFWySHBuCcam2lONUGSFhKG5JRjcoMYpoCOwSRoU1XVtJQQGor6qCkgHx5pAwdpUGyZJbolarD13KxyeUUxjlzRRPcNDzR2/sRUfK9yd1MoYzMcMdza8rHMHaVFklk3QunGusoOFYphmLQCfCsRpa2P5UEofbsUxQfMkh5rwnY32NwoqNpIUJImpFpFIHBOKvjeWm4KmwyB436qiUWiyLHW2SrBEAlBVZJZCsELBKAR7N0ZARYI2gJWwjDVHI8CbIEaJeygWp5GsjVkE5soIyLLM6QbpJ6E40XNkZhHSV0c4MrGSLlKNPtDUkJfNja3p7SwQ5MWCI6lbb4RTMlG0g+GVOfoE07cfMnGTYSXIh0tfW0jDHDUuDOAOtkJsbxcN2m1QFv7gUd3FRau/Nmy0RoQk+hnlVklyYdRmXHdrwK5rB+gNVFfmjMI+DiTfUar3JWCUmJU8tbVxiSzy1jCdNN91o/etgRPhYdCfQqKt1a0ZuDh0J06NxUipKRz1uacyHQ4k31GpfvmzD84t9Rq6AMq4Df+jYexK97GAjdhkHYq+PtP8ZPhLh/uOfe+bMPziPUah75sxDdiIH+G1dBOV8BG/DYdepJ97GA/N0XYjjrV/wDjHwldfvMB758y/Obfo2pJzRmX5zb9G1dB96+BfN0PYgcq4Ff+joexCv7PvTFwtx7znvvozJ85t+jah76MyfObfUb7F0L3q4F83Q9iScr4AdO9kXaU+Ps/8YcJce85/wC+nMnzkPo2+xAZpzLf+kR9G32LoHvVy/8ANcXaUXvUy/8ANcPafajj7TtSFwlx7jBtzTmX5xH0bUtuZsyn+02/RtW6GVcAH9lw9p9qUMr4Fww6IdvtUXfWn+MkrSu+sjCe+bMXHER6I2qLUVdZXT8/V1DpndegHmXQ58q4I+JzW0TWE8WmxC57isHcGK1FFt7XNO08x3LXZ1qFeWKccMpr0qlP6pD+HU8tXUNghF3OV+zKlc5oPdEQPQoHJ+/bzC+M7u5nO/eaugAWWe+u6lKroiXW1FVYZMccp1nGqiHah706ryyLsK2JtxQICx/qFbyaOFp+DHe9OqB1q4uwpbcp1PlkPqrW2QuBxCOPr+QVtTXYyfvWqfK4uxGMrVN/yuLsK1lx0hGCPlBLjq76v/4HD0/BlBlepH51F2FKOW6hov3TFp1FakEE7wiJvdLjavkat4mFqKaSmnMUgsR9aJqss3uIxCmA4sP2hVrV06M3OCbMU46ZYATbisjyjco+WciwNGMVW1WPF46OLWV/o4DrVdy658OQMmurqURvxOrfzNE1+oDuLiOIA1XkWlwrNubIMTzfPTVeIQxAy1VdKTqd5tffbo4JTqRi+bLKdKU/pR1DNvL5m3FnyswVsWDUxNg5jdqa36R3LmuJYzW4vVGoxSuqK6oO99Q8vP17lTiwtYg3F9CnGm9lakSSwWDZnCwG5SYZnhtgbaqujduuVIjcpCZb4ViFRh9W2rop5qWpZ8GWB5Y4ekLtXJ1y4VVNLFRZtJqqY2aa5rbSR9BfbeOtcFjdqpMDrOvc2O/rUWkxpnvGingrKaOppZmTQStDmPabhwPEJ4DVedfc7Z6fhmKQZTxGbaw+sds0bnH8RKdzB/dPQvRxbZ24rLJYY0gN6U40kG4KSAlAFQlzJImwTA+C82KktVXYqbSS38B3oKzzjgsiyUBojCAQWcmHdG0pKMIAVdAnRJQSGBBC6CYjPMGqXwQYQEC4cF0jMhJFjdJMrRvSnnRQZb7ZOtlJRyQc0iQ+pi3Em6bdURlpAJvZQ3fCKQ42CujTIOoJcdSo9QTzZTzt11HqCebK1U1zM8+hqOTJ18IqQeFQ5aqR7I27RWS5MNcIqh0VBWlxD8SQvO3i+fL8nVtedKJCqauQuL9sRsGt+peXeVP3UOJQ4rPheRqOndDA8xmuqbu51wNiWNGlr9N13/PTKyTJONx4cL1jqGUQD+9smy8l+565H8t50yjHi2P4hiMdQyd8Xc8TgwDZNt5FydFknONNZkdG3ourLA9kb3RfKJh+KMfj1dDjdG6S8sUkbY3NB+S5gH1gr13lfG6PNGXKPMGE1D30lUzaZd+rTxaesHRcDxnkE5PKSB8NNWYhFiEsbjSskqgS94FxpbVaP3GklU3k5xOjqTIBTYtLG1j/AIpAbtW9N1ClXjVWYkq9vu45O80NS5xEE3w7XBHEKZI9rG7T3Bo3XKq6TWraeIuplbTsqYxHI4gA30VnfmY3nsL7qg8cztRd00/jmdqgnCYOEr/VCT3pg8Y/1QrdMPJBykWHdVP45nah3VT+OZ2qB3pg8a/1QgcJpwL86/1AjTT8hqmT+6qfxzO1GyeFxs2Rp9Kru9dON75PURswynD2uD5NDcaWScYeQUpdy1XIM4u/2yxEA7nM/wAq64y4G8lcYzlK52esVgZ8PaYfRsrrbES37/Bh2k8QTL3k3ffM8gvr3I7/ADNW5zDikOC4LWYpUgmGlhdK63G3BYTkyj2cyyONy7uRwPrNW8x3DoMYwerwuqF4aqJ0b/MVDaCirr4unLI7TU6GI9Tgrc756xnHInMxN9DDKzukNEbTHDDvu64udF1nkszZ768AknnY1lTTSmGTZFg+253Vcarl2I5Kz1QUr8uwYfDW0ZkaI61rwHviBuGP03DTsXUeTDKUmUsCdTVEomqqh/Ozub8EH5I8y37TlaSoLRhNdMf9sybP4jfNVE8d8lhjlDjk9aZMPqhHCQNNojVQRg+aDvrv/wChUzMMOZJKtjsJqo4oA2xBtcnsVcKXOnxqtjvM4f8A5XMpOTiucf8AZsqfU/hY6cHzMN9Zf/FKScHzKd9YR/jFINNnLylvrD/8ou5c5H84HrD2K3MvdErx/wAZC+8uYwda8/TOWiwSnqqahbHWTc7LckuvdZ5tLm+3hVA7R7FpMFjrW0QGIFpnvqW7rLLcSfdp/g0UcN4wzN52ds4nSAeLJ+sKua643hSeUiV8WK0TWAXdA8knhqFBoICyMOkdtOI3rp2sUqEZeTHWm9414OB+6ww6px7N2ScAhLmNrHubccCX2J7F12lwHC6LKwy1SQNZhwpjTiMDe0ixJ6TxuqDlQwh1VmvIuOOaDFRYoYpj8kO0b9ZC1NVVU9JGJqurp6ZnypZAwfWvM7Zqy30YxPW7Box3Mpv8HiHM+C1WW8y4hgNUwiSkmcxhI+Gz4rvS2ygUzg+IOBuvSHLflPLmeqVuIYDj+GDMFKyzWCpbaoaPiHXf0Fea546ihnkjmgfFNG4sqYHCxY4HUhduxu1XpLyjkX1s6NV+GTWp2J99FGhlbIwOa4EHinBpZ3Xqt6kYCax2u9Pxu3KIwp6N25SAsqOaaJ7Jad5ZNG4SROvbZeDcHtC9xZMxQY5lXDcVBuaqmZIeokarwpBJ4bem69he57qu6eSvDBe5hdJCf1XELPWRJHQWiwSmgJI3IwVnZIXYIwbEEJNylAKElkaJtNNtjZO9PqujOy/aCnsdtNus844LYPIpAIIKskw0ESCBAQQQQBRSMI3BMOeBfgnJpuDLu8wuos2+xa/1SulDHdmSbYUkjidCs6+tmixtzJZXc3t2tfSx3K7kcIxd+0B1tKpMWoZ6is52B0YaQPhA309C20NGWmZa+pJNFwdQmnmyYjlqGxgGMuLR4eyCfSlOkuNWSeoU1jyJZfYDiSmp9IylFxJ+C8fqlN1BuCyxB61bBrPUU84NRyXD/VdZ/wBwVpcR/FLM8lv9F1v/AHBWlxH8UV5y9/uJfk6tr/RiVNgbh1rHQrleI5bwnB6qcRwTQRwzOnp2QybDQXuJJNuNzquo2uqXN+EVOIYU+agLO7Ybuia74MnS0+dc+7pOpTwmdSxrqnV59zJwS0ArgaiFlTVsbtNnY7nAwbtkO4HzLb5Sw+nw/BwYIWQmocZXBrQL34m289awGTsMzFmCrh7qw+PCcKhftS2YWulcPigHh1raYbm/Aq/GMRwenqebkw2QQyOe3Zjc4i9mu3G3FZ7C1qc3g1bSuKbShnmaaj/K2DqKn18ksMG3C0OcTbpVXhz2vrY3NeHNINnA3B3K5JaNSbeddCS0vDORmPkqu7a4f1P7pSO7q87o7fqlW/Ox/KCDZIvlNVutd4leqPkp+68QHxP3SgK3EB8T90q6L47aOCTtxje4BLWvaNYfcqBXYh4v91OR1dfttLmXF92zZWgLT8Ego1FzXgkohi5AJ0K4jmwX5UMSYNLtbfsC7hvXDM+vfTcoeI1Ebbus1uv6IXX2F8VeSXg5m15aaaf3NTydwtZmR7tpx/Bnf5mroRsuYck9ZPV5nnbK1rWilcRb9Jq6dPsiF5eLt2TcDiqtqxcbhp+EXbOmpUcoMOQJA3kBZc11Jc2o37/HFW8NPQOo46iRkjQ5oNtoutfzLDKDj1NMZNvkT9to3ub57ouej8Yz1gq8wYKTciU+h/sSTDggPwJvo3exQ5Mnllo2Vh3SNtxN0fPReOj9YKtYcIZE+NgmaH7/AL272IU1BhExIhZI4t33uPtRiIZl4LNr2u+DI13mN0o6tumKajgptrmWlodbQm6fPwSq39iXMxHKUxzsUotkX+8P/wAzVGp9YWeZWOfhfE6TT+pf/maq6D8UAu9bS/l4o5NaPzG/Jm854zgWH4e6nxS0154w6EHwmbTgGyW6ASNyZzlgmB4jQOqsZwMYx3JG57KcF138bAAgX86vMVw/D6qcSVdFT1D2hpa57bkWN9/nSrlzrk2ueC8ltWvGdx8PY9psejKFtz7nE8jZk5H80Vk+HMyE/CZ6d/NufLA7ZY6+5z2m7T507yuci1HjlF3flRopMVhbqyR5cypb0EnW/WukYBk/AsDxTFsSoKcifFpueqg8AtLuocNblaDzaLJG6lTmpQZsdpGcNFRHz9xfDMUy/iklHiFDPQ1DL7cMzSA7radx9CuMt4LmHMEDpsMy9iVVC2+1JFFdvoJIv6F7WzDl7Asw05psawumrY7b5GeEPMd4RUGH4dlfBKXDMJgEFLFdsMIcLkm59JXTjt2ajjBzXsJSnzfI8V1NLUUNQ6mq4J4JWaPjljLXtPWCkh1rLsvup6alinwCvDQ2unMrJCBq9gbfXzG2q4mHgr0llX39FVGubOBd0NxVcE8k2F/hDqN16o9ypXGfJeIUV7mmri+3Q142h9q8mseWuvdd79yNjjYcx1OFSSAd8KMOjBOhkj/jYKysvgbM6PTIOiMICw0G7gjWPOSYsJQCQEtJkkhY4p+lfYlp9CYCUCQbhVSRNciciKKN200FGVTglkJBBBAgIIIIAeoYYmUzA1jd2+yfLGfIb2JujH4NH+iE4Tqqm+ZOK5DDo2vfd0bbDq3pfNxgi0bPVCYrKxkB2B4TyNB7Vk86ZsqcGweWtikpmvaQA0nasVdRoVK0lGHchUqU4LMjasjYPiN7AhzbL/i29gXHcF5X6rnm98aOKWE6OfCdR5hxXVsDxagxmgjrsPqGTROHA6tPQRwPUrbuwuLR/MRRQvKFb6CbzUfi2dixefWxQVtOY2BrnsJNuNltSTdYPlPDjX0Oybfe3fwT2c266RO6SVNlhyVOBwesPTVOWlxY2o3O6x9qy3JIb4PWtJ1FU662M8bJYnMeDskWKpvcK4lnyTtv6MceDA4zjktPK+npI2l7TZz3bgehQ8NdjWNYXW0DKkumfKGmVhDTHGRra/FW+I5Nqp6ySWCujEb3bQDmm4U/KmXqnCHVLp6hkrpTcbLSLLXUnbcPiL5lVONZV1LsZzOWZanK+VaLDXuhlx+qhETWtddrLCzpD1D6yuX0dP3HS8xtmSWR5mled7nO1uevj6V0jGOTXG8Vx2qxaqxakfLM4bALCRGwbmjTcmncl+Kg3dilK5znbROyQtVhcWtCOG+fcjdKvVecFdyUz1bs2RUzKiXmRC98kZJtoWgH611TMOC0uOUgpquSdsbXBwMLy038/pVZkzKVPlyN8plE9XKNl8ltw6B1LRSNMjdnac3rabFc2/uI1a+qn0LLe3ahifUyH3OcE8qxP9qcg3k5wTyrE/2krUmhvuqqgfroCgPldR66odzU9xJWlPujMfc7wUbqvE/2kpX3P8HG6pxM/wDklabuE+V1HrIdwnyuo9dLiankfC012IuXsFpcEppIKV9Q9sj9s88/bN7W06tFZ9PVqopoT5XP66DaLZc1/dU5s69i5VSbk8svjFRWES2uBXGM+Brs6YjcX1Z/lXZuK41nof7aYj52f5V2NhL+Yf4OdtV/LLHkoa1ua5rafgbv8zV0+QBzC0neLLmfJWP9ppT/AMo//M1dJneIoHyH4rS7sF1Da+eLePsLZfK3/wDZWDAacm/Ov3q1ipxHSNhjkLS0AB1rrnh5QK1rnkUEZaCbAu1sFu4q5vellfK3YDow8jfa43LNcUK0EnU79DRQuKdTOkdMFR5UfUCQaec/nP7gULv3C8bTJG7J3aFAYrtHwXs9UqjdtF+qJNdSVBbbuv8AcTkMD4/hT7f6tlHpsRDoXyyltmGx2QU2MaoT8Z/qlJwY8xLPggR4Kr2YxROcGh7rnd4JU9pu0OB0O5Qaa6jTyjKZ4btYpRnhzL/8zVUsNhZW+dTavpOuN32tVQF3LRZoROZW+oargOaD72I0Kjg7Is4pWOQmpweqp2ySMc+JwDozZwNuCxGEYBVVIa+tqsRZBYXjknu5/nHALze2baMKuvJ7X05JVrd5fNG1Y9kjQ9jg5p3EG4KUmYWsiiZFGA1jGhrQNwA3J24Xn8HZfMUN6o845nyvlmiGIZhrIYWxkiMEFz3OtezQNSVbzzsgjLnHhoBxK87+6zlf3owVzyAZKx7nDzMFlptKaq1owfcy3dSVKi5R6o5nyo56kz1nd+J7D4KGJhio4CdWt6T1k27Fnad+1GCFVyO2Kvb6LFS6eXZkdHwJ2m+Ze6t4qnHQuh4WtUdSWpk/aV5kfHazL+K0uK0MgZVUU3ORX3HX4J6iFnWuKMP2Hh/A6ELQ+awU5PfPJtnTCc8ZfbimGyNbK0fhNMXeHA/iCOjoO4rUcbL5+5ZzLi+X8UjxPA6+WiqmC21GdHjocOIXqPkh5Xo82Ya+HHIW0dfA4MfM38U+/wAEn5N+vRZpUdJLUdhBHSEe0B8YKre9xPwilAutqbqG7Qt60WgkZ8sdqVtAjR11ViydgkLDpuUXT5DVXJa0j9S1SNoKBDIAQ4cU+HX3LO4lyZI2h0oi4dKZ2iiLlHSPI9tdaCY2kEaQyWlJrSxfohMYnWwYfQVFbVPEcMDC9zidAE9SH8Fi/RCxfLfI6PIFS5tw0zRh5HydoXULelvq8aflhXqOlRc12RWUOPS5pxXvXgl3E+HVVbwdmNvQOtbODLGDMp+aqKKKr6TM3av6Fh/c7OhkwvFHgt7oFTY9OzYWU2oreUCXPNVS0lNDHQN1YZW/e3N4G/SuleUXG4nQpy0qPl4MNCt8qNSay5EzM3JllrE6WTuKgjoKreyWAbNj19S5jk3FcQyLnaXDa6QtidK2GpYdQQfgvH/vFdNyS7Ojs1V5x47NAGAMaPgB3DY6rLmvLu6FmfTzJG2aRpk/SDjZb9mSqVakrOrLXGS/OP8AZkvlCMVcU1pecfk79E8Pa14IIIuFiOU0/h9D/wBN38Fp8rvfJl7DnyfDNOza89lmOUlu1XUX/Td/BceyjoukvGTq3D1UM+SVyQRNjwvEA29jVudr1rbuGixfJL/RuIdVUQtlUSMhhfLI7ZYwFzj0ALLfZdxL8llthUY5ABqgRqsZDn6CoqXsgw+d0LWc4Xk28D5Vuha2iqYqujiqYHB8crA9jhuIIuFVO3qUvrWC2nWhN/Cx+1huSXb1XT19bHK5gw2Z7WmwcDoU33xr/myX60lTz0HKa7logqvvhX/NkvYURxLEB/ZUp8ye7ZHex8FtdC6qO+eI/M0/ah30xH5mn7Ubthvl4Le6F1X09ZWSsDnUD4yTaznDRcLz77pBuB5mrcIwrL7ayOjldC+eaQtDng2Nuq6I0pN4Q97HGWegyUAV5e/0psV/+KUf059qL/SlxPhlSj+nPtVnDVPBHfwPUd1xzPH++WIedv8AlC5+fdS4qf8AhSj+nd7Vk8Y5cKzEcXnr5MAp2OmtdolcbWFuldPZadGtql4MV+t9BKJ3/kuH+00v/aO/zNXSaiMSwviJsHtLSfOvIOXOXmvwWvfVxZepJC6Ix7LpXaag339Sv2+6jxa/+61B9M72pbRpzq13OCCzxTo6ZHYncnG1tNGKloebHwBxW5poBTUcdM0bYiYGC/Gy8zf6UWJgXOVaDd493tRD3UeKcMq0H07vas1ZXFVLedjRTjRptuK6npy726cy1GHP8U0LzGfdQYuf+F8P+md7UQ90/i9v918P+md7VRuJ+CeqHY9PA9DQOlCw+S3sXmH/AEnsWP8AwrQH/Gd7V0fky5V6zMlfh9LjOCxYezFA/uGaGbba5zN7HDeCm6E0s4BSidXFvkt7EsOJGqQCjBWfBekkZTPLiMQov+m/7QqprlZ57NsRof8Apv8AtCpmEld+0XyUcWvL42OyN22ObfeLKDzUjDs7BNuIU1pKUVmvdn07v6jZs/aVWyb09GQCJWgnmibcBvKhvxB5YQxux594VzbW+9U2KUmxVB7dGybx1rz20djxtaWuLPTbM21K5q6JojxRzVMhJcXHeVyL3WeDvmyHQ18Vz3HXAvPU5pH22Xd6GnjjpgWjwjvKpM75epcfwCtwqtbt09VGWOuL7J4OHmNlxrOru60Zvsdm6hvaMorueCHWfC14N+B6iE5GS6IOHwoz9St845XxPJ2YZ8FxSF7G6mCS3gyt4EHiqNpLXXaV7ynNTjrj0PBVKcqcnFk+GqY7RxDT18VKvcedVJLJN9muSo5pqY2eecaeI1WhciGC3hJabLd8j+KPw7PeHWAdBVSCmqYzukjdvBXPqSdkou07uC13JuQ7POCMJGy6tjvr1pvmiLR7IynNLTT12BVMj5DQPvTyONy6B+rLnjsnab+qtDcgWWfw4B2asQqm6ujgjhf1nac77HBXpcOAAVOCocBPUlN1TQdolBybXIEyZC6zWqYxwLQoEIvG09SlQuGxZZWjRF8h3aQ2km6InqUMFgvaQTdx0IJaRZLml/Jo/wBEKuzdg0WPZfq8KmIDZ4yAfku4HtVjR60sf6ITjhcbljU3Tqao9UXOCnHD6M82ZKx7EeT/ADfPBiFO4M2uarILa6HR7fR2rveC5uy9i1I2oo8Vge1wvsueA5vUQeKrM8ZHwjNUYdVNMFW0WjqIgA4dR6QuVYnyM5kiqD3HVYfUxHc5wLHAda9FOdjtNKpVnon38M4zjdWPw046onWM2Z8wDAKN8rqplTU28CCI7TnH0bguI4Jh+K5+z6aqqBEczxLUuGoijB0YD6B9a0WAcjGLOl2sVxGnpYyfCFM3acfSdy63lzAMNy9QNocMg2IwbucdXPPSTxRv7PZ9OUbaWucu/gcaVxeTTqx0xXYtKeOOGCOGJmwyNoa0dQFljeUX8uov0HfwWzvosVyifl1H+g7+C5Vhl3COlc8qRM5JT/q7Ev8AvHLW4jA2roZ6Zzi0SxllxwuFkOSM3w3ED/zbltSNFnveVzL8llstVFHL48mZmFG7CzLRCmd4HdH9Zzd/g+bqXRMJomUGGU9Ex5c2GNsYcd5sLXUwhFZRr3U6yxIdO3jS5xZW1AqmznYxQRN4NLGm31JH4X89N9RvsVi6KJxu6GM+dgSTT03Gni9VZ4ywWaZsgWq/nlvqNSHNreGMs9Rqse5qbyaL1UO5qTjSw+oFPeINMiutXfPkfqNREV3zyz1Gqx7mo/JIPUCHctJ5ND6gRvEGlkKDuhkzXS4nE9g3jYaCV4c5e8OGGcreYaZhPNvqTK0dTtf4r3eaWmI/J4fUC8b+68w7uPlY7pazYZV0jHiwsCQLH7FsspJ1CmtF4OOHRFdE52trpF+tdZoyC7670YJ6U3dKB03owA4HaIbQTJJRXKYh4OKMO1TFyjBN0DySQ7RG0phr9EoOSSHkktNty7TyM4nzeEZdncbvw/Hgy/ENew//AKXEQ5dD5K6p/ePGGNd98painq2eg2/grIU9acfsKTSw2e5CbPI6+CPeFhIM04rLDFKIKYCRjX8TvF+lPDMuKnQxwD9U+1cbgape7uPQdzyScQoz0Rv+0KtgF2XSKqSerqTPUP2nnTqCdj0aAutSju6aiznzalLIoDRHa+ir8ZxeiwqIPqpg0n4LBq53mCyOIZ5nmqHwYdTNja0XMj/CI6lppWtWt9KKKlxCmbiaaKCJ0ssjY2tFyXGyp34vS4hOIKQOdsm5e4aehYWvrauscJ6uofO4HTa3eYALWZawx9MGSTC07xzjx8kHc3s19KxbetoWtk3VlzfRG7YM6l1ex0dI9TTMOy0NG4JZsRYi90yAU4Cvmy+x9LkjGcp2WsDxvL80ONUENZC2xjDxZzHHQFrt4Pm6F5wzByOTMlMuX8SEjOENSNfNtL0tyjyvFHSwg2bK4ut0gf8AoWMavp/pfZcZWWur3Pm3qLajjeaKfRHl7MGVMw4G8jEMMqGMH9Y1u03tCpopCzRpsL6gjevXm0H3aDtAGzhw9IWax/IWV8d2n1OGRwVB/rqf727sGn1LpV9kSXOmznUtqRbxJHmgTc3MJYxs2PhN6Qr+hq5IJ4aqneWSRuD2OB3EG4K1Oc+RzGMNp5K7AqgYnAy5dERaUDq4H6lgsOeWQGKW7XxEte1wsR5wuXKlUpS0zR0qc41FmLPYvJbypYHmWGJ1ZNFRY1sMjrIHENbPYWEjD9oXVdoHcQdL3G5fPRkl9lznO01aRw83Qu7chPKZj1HSvpcdqm4jg1O9kbpHXNRSNdo1xPxmXBBvqOlV4ISiz0sCjumYpWyRtkjcHMcAWkcQdxSydd6eORTnmWFOfvLfMpEB3qJAfvLdeCfhcOlZZI1RJJPQkkpJOiK6hgsyLugk3QSwIu6E3o4jwLQn1j2YjX07THFKNk7toXsm34xi4B+/RX4WZ/NUStJt5LlWWDXzSc24Exvc23xUUc3OXGw9tvlLGRY3jLodqSeON3ydi/8AFNvxvGNwnYf8P+akrKoRlXiupuwR0pDrBYOXG8aaLidvoj/mos+Y8dYNJxr0xK2Ozqj6NFUryCOh7aw3KU+1ZRkHURu/gq05kzAfzqP6L+aqsSnqquQz1UzpZOvgt9ls+dKspyMtzdxnTcUbLkddfCK8/wDNuW5ke1kZe4gAC5J3BYPka/oWv/7srY4y0vwmpYASXROAt5lyr9J3c19zbZyatosi++XA7n/WUI7VaRSsmhZLE4PY8Xa4biFwtsT+a8KnkJAt+LPsXYsqNfDl2hikFi2Fot0aKd9Ywt4xlGWcha3M60nGSwPz4nRQyGKSqia8b2nekd9sP8rj7UuopMOfMXTRwbZ3l1rpHcOFW0jpz2e1Ylo+5pbb6A77Yf5XH2oji+G8ayPtR9w4b4in+pF3BhfGnp/qTSp/cjma8Bd9sO8si7UffXDvLIu1GKDCvJqf6kYoMM8RT/Uj5f3GnLvgIYph3GrjXmz3a8EEsuXMWgIka4SQF46rlelhQ4cdBBB6LLhnu0MMaOTzC6qBjWMpa8BwA+XoraDgqiwQqZweRXHwykkoz8MpL120Y2sMO6UDokhBAgFyLaSXJKB4HNpGHappG3egMDwKcamWpYKBDwW45JpL4ridL8Wow59x1sNx9qwrStZyXVbIM6UTH6Nna+D1h/JW0fqFUWYHqbKU/deWsNnJvtUrB6QLfwVrbVZjksmEuTaeJ2r6eaWA+dryfsIWp2UN4MwoDRFPLHT08tRK7ZjiYXuPUAjCzPKXWPpctvjjJDqhwi9B3/UpUaW9qKHkjVlopuRgcRxSXEsTlrZ7eFcgE/BaNwCbwk3pRKR4Uh2iVVzOYIHAOsbWVvQlraKB7dW7AK9bGEaUcLojz+XOTyanI2EHE8WdPL+S0TedmJ3X4BbBkn3x8lgC9xKm5ewI4DycyPkFqustLMeIJ3D0CyrWBfJvU+0HdXWlP4UfTvSlpG3t3J/UyQ6YjVTsBpJcUrGxDwYWG8r7X06B1qPhWGVWKVIhhGxGD4clt3m61sMTFPlvKtZLTtDOYhLr8S7cCfSVxbGzlVqLB1NpX6t4NR6nFeUjEWYhmyobDpDS2p2DhpvWdG5Fzj5nOlkJL3uLnE8STdImnigbeV7WjpJX2+1oRoUI049kfIbio61RzYVEdp05PjCpTALqDh7i6Ey2sJHFw6bKZE65VzXIrjyJkVwN9vMuR8u2UYGUwzZh8IZLGditYwAc60/G/SHSuttOiiY9RR4ngddh8rQ5k0Dm69Nlz7ygqlN8uZttq0qc1joeTqVxbPJA47QFnMPS0hdC5DJ2t5S8Nw6Zu3S4oySjqIzqHNc3j5iAVzuMc1WztfoYGc27zgkfwWn5IMwYZgvKDh+M4s6XuaiD3t5tu0ecsQwea5XlT0OeR7A5Jq6SoygymlkdJLh9XPQlztS4Ru8E+qWj0LX7RssfyUYfNh+T4X1Wz3RXTS1soBuAZTcAegBa5pU4rKMrWGWEB+8t8ycYbSKLFO1sYab6JxtQy/FUSgy+E0T9rRC6jxTsduvdPAqpxwW6si0Ei6CjgMkGdha4hwN1Gfo7ctLLBGXc5s+Eo1VSMmYfB8K2lkQr9gnT8FA4XQhbd4vZSHUVS2PbdE7ZTMejwtammuRlcX3H3Mb0BNPiYRq0FPlJcNEKTDQmVFZQDWSHzlpVRWACMrVFqoswU3Nxc5GNCdVttqnxJMz16eIto0PI6NnCK/8A7ordbxuWH5Hh/qmvH/MlbmxXndov+anjydew/t4/gb5iHxMfqhLAAFgEdj0IWKxZbfM1cl2KLEK/CGVkkdVTzGVps4inkIPpAsVGOIZd2XPME1mkA/g0un1K1qMNklqHyivqG7euyLWCQcLdsn8OnJ6bC6sTIOL7FUMUy4SQIKn9lm9iWK3LjvzWpP8A4s3sVkMLlBJGIVA7Eo4c8/CrZiekgJ5QKMvBWity4Pzeob56Wb2I+7svc2ZOZm2QbE9zS+xWHe2UfBxCYeZoRd7ZtbYjOCd52QjVENDZDp6/AY6hr4oalrxuPc0vsWD9046mxvkVxxsAldJStFQNqF7bbBvxAXSBh1UCLYrUeloVFyi4JNX5Ax+hmrZJmz0MrdlzRv2SnCUdaZFxaPntKGiQ7JuLpBSIHbUMZ6WAnz2S16CLyjJLqAEIXSeKIlPBHAbikoX0uiJHWkMNG3ekXRg670CY81HxTYdojaboAda5WWXKnuXMGH1F7c3UsP1qpBT0Dy2WN17bLw7sIUodUJ9D1ryUSBsOPUl7iHEzI0dUkbD/AAK2wddc35J6mM45isbSfwyhpKto822x3/8AldFF1ZUXxNGUdC51yuV+1W0tG112xRmR1vlHQLoYdbeVxPOOId34zV1I+AXljPMF0NlUXOtq8GG/qNQ0kSmo3VMLZHuAad/StjydYG3F8zUdAYyaaJwml10IHA+dZ2hGzSRNtbwRdds5CcJZT5flxeRv32skOyT8gGwstu27t29q2ur5GXZ9vxFdLwbbMFHJXYNLTQNaJCLtB0CzWFZVqpHg1/3mPi1pBcVtrIEburRfL6lCNSWqR7+jczoxcI9GM0VLFSxNigYGxgWtxWG5ccQNLlmKha+z62drbX1LRcn7At/uXFuXKt53NNJSBx2aenLiP7zz7Grs7Fob27hHsuZydqVnC3k/JgJgHhzQbC1tOCp20zaesBrWulicfBlJuGnrH8VbE2KrcQldVVkdCw+BtB0pHQOC+m4PFJli0AkAWsN1kqhO1GXni4qJV1TKNge4Ei9tE/h1m0zENDyTmlOMOtjuOhTDXdaWHab1U0TjI8tZ5w40WcMcoIhYPrnuv0NPhD/MqectpIdlljfTr862nLS6Kg5QcSL77UzIpGgcfAA/gucTTmaXaeT1X4LxV1phOUV5PVUZOVNNnr73JebKvH8k1WD1sj5JsIka1j3b3RPvsj0EHtXaQVw33JGXKjAsl1mMV8D4pMWmaYmuFiImA2dbfYlx7F29jg4aFFJNRM9TDfIeB0S2lNNTgTaEiRSfjAFYjcqykP34Kyas1TqaafQUgggqsEy10Q2ehNyHZBPRqfMpDBfdqDuWPJpSyJI2gb63WYxGJsNW9jN17rXBmm5UGM0EpmkqG6g7wrrWaU+ZCtDlyKpsmybOKW+WMDeoziolW43AuupGGo58paSeZWfKCiYhPC6B0ZcHX4KE42CjyC60QoYknkzOu2mjY8lYa3D68tFmmouAtZX1UdJRzVUgJZEwvdbfYLJclmuH1w6J/wCC0+M076rCqmmj+HLE5gv0kWXnbxLipJ9MnZtpNW6a8GEg5VsPebvw6pAIvw3dq6BQVUdZRQ1UJvHMxr236CLrjVHkDNjaMUjqekDTY7QlFwuvYJSPoMHpKN5DnQxNYT0kBado0bSnGLoPm/vkrtKlebaqrAmpxNsE7ou46p9uLYiQfSm+/EPGmqR+omsSna2reBiM8IHxGxXA9KiGovoMYqvof5LnLBrcmiw78RcKao9VDvtFxgqfSxVbawbzjFVb/oo+74dog4vU2A38z/JPERa2WffaDxFQP1EO+8PCmqj5oyVWd2whocMYnsf/AKUHYjAxpc7GqgAf/T/JPSgyyz77x+RVv0DvYiqKlldC+jdR1bGzMLSXwuAGnTZQoK+BsjXOxaZ7RrsmPerSnxShnmEEcxL3bhslRa0voHNnzbzDRHDMx4ph1rdzVs0QHQGvIH1KGVuvdA4aMM5ZMxwNYGskqueaOp4Dv4rCgr0FN/AmZJrEhJ01Tbilu3Jic7LCbqbIig4X3oFw6Qq4kk3uUCL8So5GWAdfiEYJuoD9qKqjjaTtDeppcLprmRY6DojDkgHRGE8CHA5KLvBPmTQTkYu4A7k0D6HonkdrB38y/LqRV4RPC7ztdGR/FdmbquAckNW1mFZYrXfm+IvpiegPY7TtIXftsC/UVdU+rJmKrOeKNwjLVXUj8a5vNxDpc7T+N/QuIyyF4bHv119K2fLDijZsTp8LjkJbTt25W/3zoOwXWHiPhtv0r0my6DhR1d3/ANHCvKuuenwaSMOdDHE02c6zR6dF6jy7QMwvA6KhYABDC1unmXlykeBV0hcdOfjv6wXq9pBAIOltF571XOWqnDtzOtsGCbmxd0LoILxrR6QO9l505RKzu3OWJTbQcBKIm26Gj2kr0VLow+b+C8uYq5z8Yr3ONyamQ/vFeo9LU0685eEcPbk2qcURKqYQwOl6FXYc4M2p3/Dk49STik5kk5lp8Fp8JNc5fqtuXu0jzLY5jrudpWtZvLgrSC7ImsPABUtzLKyPedoK7FifQm0RyPtdqdU6Doo7U606Klkzn2feRzMOfMxjGsMr6Gnp+abC8TOIILeoDrC1fJv7nnLmAyx1+YanvzWRkOZGG7MLT5jv9K6bkptsE2vlSuV4DZeQureEq8pfc9DQrS3aTGBC2MNjY1rWtAa0NFgANwCcjuzUIybnciQlhYKm+ZMgcHp69tFXxuLTcFTIXB9tVXKJdBkikJ54KyadygQNtKCprSsk+ppgOX60Em6CrwWFyA032txCGHvvtRHfGdk+bgq+HFaOTRz+bd0FOOqY4a5j2yD760jQ+lYpU2XxqrqXWgG9RK97G07iXWFlAqMVjjcQZNq28BUuIYpLUkxtGxH0cVKlbSlJMKtwksIiTuaZHFosLqFVC7gpDio8upK7dOODlTlkjSJpyfkFwmXhaoszNcjXcl+lHXdc/wDBbE6rnGR8Xgwuslpao83DUG7XHcHLfDEKAgHuyC36YXmdoU5KvJ46ncs6kd0k2SQEpRDiFBwraf6QId8KHyyD1wsCpy8GzMPJM4XSCVH740FvyyD1wknEKDyyD1wpqEvAaoruSCdUlxCjnEKG/wCWQeuERr6HyuD1wmoS8EdUfJJuOhDToUXvhQ+WQeuEDiNAPzyD1wpaJ+BOcfJK2uAROebG+9RBiNBf8sg9cIHEKA/nkHrhLdzfYFKPk8i+7MweSj5S4MXEWzDiNIyz7aF7PBI89gFwokDivoxmnC8q5ow/vfj0NBX097hspB2T0g7wfMsezkg5HwwNOXcNNtxMzjf610qVy4RUXEomk3yZ4WdYjeFDrn2AYDe/QveknJHyQNbc5dwwN4/fXafWvKPumKPKuE8pJwXKOHU9FSUlI3njE4uEkjiTvJ4CyvhcanjBU19zl3FPUobzu08XYwFzvME0n4KWarbT0VNc1FfUMpogN+rh/JWC6DFCXTTSTu1NypzBfWy9bYXyQZBgw6mp6nL8Es8cTRJKXOBe62pOqlfck5PLaZbp/Xf7VaoMqdVHkHqSm3Xr1vJJye//ABun9d/tTjeSTk9t/u3T+u/2qSRHeo8gNBT0bV67HJJye/8Axun9d/tRHkl5PgNMuwD9d/tSDeI4tyWzOOUKiINLnQYvBLGBxNxu9F16SqqhlPTS1Uh2GxsMjr8LC6rcCyblrAiO9OEU1PY7QcQXEO6RfcetUHKrjbaSiOD07z3RUNvM4fFZ0ek/YVrt6buKigkY69VU4ORzbFK2XEsSqK6YkvlkLiT9SjpDbgWS17SMFBKKPOt5bZa0szpsPfY/fIh9m4r1LkvF4sWyvh2INkDuega4+e2q8lYdMYaqxNmSDYd6V2TkGxuQ4XWYM91zTP5yEE67JOv13XnPUtm6tFVF+06uxq+iq4vudqEzflI+fb0hUXde7RLFYF4d27PVbwuHzN5t36J+xeXcWkDaytmvumkP7xXozusOa4X3tP2LzFj0hZNUwgm7qiTsDivT+mKemrP8HD25PMIYKxz3PcZHaF2pQDkgu0SNoi69pg83lk/DmF1U1w3N3q3bvVZg4Lo3SdO5WTQQLkhRZJD7NU40aJpjhuunWnoWeRZFZN9ldvM4HTN+UC7tJVi9xUTBQBhNM3iGD7FLLQdV5epzm39zrRzpSCB1ulBJsltY625VvBNZCvZSKVztsWBsmmwueRrZTqeHYaLDXiVVUlhFtKDbJTNXCylsGiixtNwpLSsMzdFYFIIroKolzJTsMo7EmAFI730jSNmLZsbixOhU9x8HVMv33VGWy1QREOHUttGEelMVNBTxwPkANwLqeHqNijrUEvWFdTlJNLJCpCODO72pp+8p7gmX7yurHkc6fMadaybITpCSWHirYtFbRHkaHXu0HzhQ5aGN3xG9isnMSHNNlZF4ISi2U0tJDGbc030NTboIvFHsK6Jk2mcKCqnNJHM4n70JLWd7Ff0ZgdDtVmH00MnyWtDh9i59Xam7m46c4NlOw1RzqOLSwQeKHYUyYKa+rB2LujxhZGtLTH/BCZmhwgsNqKmJ4fegox2zzxoG9m/8jibaWC/wApMdHC74g7F1F1LRkn8CpvogqDN0MUTabmoWR3Jvstt0LVS2jvJKOkhOycFnJku98Fvgojh0Z+I3tKsXBG0LdrZl0pdStbhsXyBdK72xcYx2lWQGqVZJ1WhqKKvvXDwjB9JQ72ReLb2lWaCWvIaUVhw2FjS9zQA0bR8wXjnlCxFuKZ0xavYRZ9S5jbfJbYD7F615T8YZgOQ8WxFz9mRtOWRdb3aD7SvFQLifDO043Lj0nisVxUcvhNltHHMPa8E8V0n3O+CHG+VrCttodDhMLqx+mm0B4P7xC5s23OsHXc+Yb16O9xrhIOEY/mKRvhVUzaeJx3hrdXDtssq6muTwjv1rm6OyMI+Kv1Y6mFsSBqlt6EiSRkbNp+lzYdajSzubOIgSHAbT7cOhc682nRtuT5vwdKy2VWulqXJeSaEdr7gqZ2O0DMTGGPrY3VZFxELk267blaNnsNRqssdt0Ir5icWapbCuE/gakVGa8xUGXaPnKhzX1Eg+8wX1cf4BcUxitqMTr5q2qeHySOu4jcOgeZdTzPkygxqrnr3VFRHWyfBc592N6Bs9HmVPlzk/ihc6TG5xUWd4EUVwy3STvPmXd2f6j2XbUXVzmZybj07tGtVUNOEznAFxcAkdNtEQcCbAi/Qu90+G4bFCaaKgpWsboWiMHtuoGJZPy9iERbNQMidvEkPgOHYlS9e27lipTaRpq+iq6jmE02cRNtqxWx5LMUNBnKlJd4FQTE4+dSsa5NqmImXCK5k0dr83ONl3aPYqfC8vZjpK6GZuGy87DKHcLaHzru/rWz7+3npqLocCexr+0uFqgz0Q6QX0KIyXGhUCKrjfEH7DgSLkHgeKJ1XYeCF4ad/bQX1HrYbMvJxzpJ7ZQHDa6V5zzVduZq6K+jJ36ec3XeH1D36aDzLP1GVcCnr566ehEs07tp5c42v5rrTs71PaWU5Tabyii69N3lyknhHE2MfNcRa267KSygke1u05rSejW67K7LmBOj5s4ZAWdFistmfK8VE4z4awMYPCfDckOb1dBC7dl64tbmsqbi1nuYLv0hdW9F1FJPBhZ6CvDbR1Yc1u5g8EfUk0bI9oR1YqqaQ/BfzhIKuLehE5rXjZcAWnhZexT1LKPJPKeGOU7CxgYZHSW+M61z2KbTDbljiG97gAojCAAAAANwVtleHujG4G2HgHbKz15aIORdS5ySN7FEIomNboA0BOMdwSyL70QaL6Lyrlk7KjgUN6kQxFzAb70yG71OgA5pqolJosjETsFhB3qQyTQaI4mbR8ydaB0BUSlk0xjgSJT0J+J20EmzegJTdNyqaJp4F3QSboKGCWomc8XNBB4JJeelQaafaZs33J0v61Ddk94Pl5UTEZD3I4E3uUHykbioVbOCNi6shTepFdSonEilyacNUtRcWldT4bVVDCGujhc5pPAgGy6Bj7DttUZC4175swPAf3yl1FzYCyHvmzB85TeqFtVnPGShzOxEJDhoVx85kzAf7Sm9VJ98mP38LEp7dQCfCVBaz0vlMWwSHzn7VbENI1bdeWIM1ZkiYGsxeraOgFO++/NPzzWet/Jcyexas5uWpczoU7+MYqOD06Y4/khE6KP5K8xnNeZ/nmt9ZJ99eZ7/0zW+t/JL9Eqr9w3tCPg9NOihPxCq3GcIgr4WNL3scwktNrrz03NmaRoMZqu1ODN2aANcYqk47IrReVIjK+pyWGjrdbgVZTDbAbIzpbv7FXlliuajNmZ3t2e+9Sb9NkzLmbGYoXTVGIvZGxpc95bo0AaldGna1lzm8mSVSMuSR0+2qC83YvyxZsbVEYROxlO3QOli2nP6+pQfuyZ8+NVUx/wP5qiU0ngsjRm1lI9P8ApsmJayhiH3yupW9N52j+K8w4hyr5zxDDqijnqoRHPGWOMcZa4A9BvoufTCVwu+ercTvJld7VGVXHQnG3f7ju/uosw0cuXMNwCgq4JpauoM8wZKHBrGCzb26ST2Lz2KOa58OPf8pSHU4c4E84bDe4klAU4J+N2FZZS1vJppQ0oiVELoIJnyPZ+Ls2xvqSP5ru/I5yp4flPk6oMFp8vPmnBc+Sd1QGMe48bAErib6SNzSHNJv1qdSOmpoWwwOsxu4Ebk4aVLmSl0PRbuWPEnsdLHg1C1oF9nnXOPbYK/nz1jTWt2KWh8KMPBsdL+leZ4cUr2x7AbEb6XIKt355zQ+NtpaXwWhjbxHQD0roRqW/eJhqUKjeYvB6DwfN7aieNuPVEcLhLtgsadnZA0HnupeOZoip8FM1BUQS11XIGwt2x97LtAXdAAsvMlZnHNchb+F0zWjgIVGGb81Bh2ayn9MK4Vxsizq3Dr8/x2O3b7WuqNHdYR6fwp+WcoQufU4mzEcVntJUTMs95cd4b0BSKXPlBNUhktNNExx0eSD22Xl2mzZmZrnPNTTEnUkQ6/apUOcsyW0lpd/iT7VQ9i0q+ZV5Ny7fb/RbT2tXoxUaSSR67pq2mq4zJHLG6ADac8OG5RsXxHmI6elp23ra2TYp2A32Rxc4cABr2Lyi/Pmb46eSCGshja4i4ZGRuNwkfdBzw6vbiDsRBq2M2GS7GrR0LA/TsE38WTf/ABA5LDjg9P45mfBcqxtoHSvrK0DaexhBcTxc48EvAs64PipDA8wPO5r15NZmTHnVlTW1M0ctRUO2pHyC9z1JcmccbjHOB0DSwXDmsOihL03OX71ksj6ghDpHke0Wva9t2kEdSO11w3LOYcfhwGk52ufzz42uf4O42UyXGccrJGN771UVzb72NPSkvSt218LRb/FFr3iztDSbb0dyuKT1+Mw1EkDcx1b3xO2H7IB2XdBUukzDjFPGGvxGaU/3wov0neeUL+J7TwzsAKUT4K5WzOOKMA8NjvOnW52xIaujhcPOQq5elb1dkSXqez+501QMZdFsMjf8Im3aLLCDO1Wd9FGfNKfYkSZ1cbGTCy49U38lFem76D1aScvUFjVjpb6ldWM5uqmjvfYeW3TQUWrxUVFZJMylMbXuvYuuksrATctIC+v2leKoRU3h4Pld3SlKvJwXLJYNK02QIdvEaia3wIgB6VjRXU3ynnzNQp8ZxClkfJRVL4C/QgDgq7ypGdJxiwoUJ602jtIHWlBvFceGa8w/OL+wI/fVmA78Rf2BcJWs2dU7EApsA+9NXEBmbH+GJSdgSxmrMg0GKyDzAKLs5snGWDu0Z2QBZKBsud8l2O4vidfWwV9WZ4o4Q9lxYg3AW/2hxK584OEsM0QlkeDkA7VMh7b/AAksOb0qDRMc2kEnaCCWBjZooOMko8yQaKmv+OnUt40TTghN+SDWSO6kpr/jZikGjpfGSp9yaN1NZ8kGkJ7lpQPxsoTdRQUNRTyQSyyuZI0tcL8ClkotFLEvJHKMy3k0yhs/CrPNzqU3k2ykNzak+eVaQmyLaI4q3eVe0mQxHwZ/7m2VLfi5/pkX3NcqeLm+mKvnOPyknbPykKVb3MMQ8FIOTXKvi5vpylfc1yqP6ub6cq52j8oow4j45Q3V9w8Q9pTjk3yuR+Tzn/GPsR/c1yv5LP8ATFW/OyeMd2oxPKP6wpZre8nin4Kkcm2WPJp/pigeTfLHk0/0xVt3TMP6wo+6pvGFL53uGt0uxTjk5yuN1POP8U+xNVfJnlSqppKaamqHRSjZf994K+7rm+Wh3XN8tLVW9zGpQ8GGdyE8nLhrhlV6Kg+xNnkF5Ob6YbWftB9i34q5DxRmqf0qt0pS7limjn/3B+Tn5uqv2g+xA8g3Jxxw2q/aD7Fvu6ndKHdTulRdGXke8SMCeQbk4OhwqoP/AJB9iIcgnJvf+iaj9oK6CKl/Sh3S7rT3TQb05/8AcG5OPmmo/aD7EY5B+TnhhVT+0H2LoAqX9KPuh3SUaGGtM5+OQrk6H9l1P7QfYj+4Vyc2t3sqf2g+xb8VDulDn3dKNMkLVE5+eQnk4J1wupP/AJB9iT9wfk2tbvVUftB9i6Hz7ulDn3dKEpD1xOfDkI5OAP6Kqf2g+xGOQvk4aNMKqf2g+xdB553ShzzulGlhrRz48hnJwd+EVH7QUX3COTg/2XU/tB9i6FzzulDn3dKNLDWjnp5BOTg/2bV+ioPsRN5BOTZjrnCqpw4g1Gn2LogqHDij7od0paZeQ1oyjeS/KLWhjKeraGiwtOdPqRx8mWV45GubHVmzgbGfTT0LU90OvwRiod1KadRdJMg3HwZVvJhldlRUzbFW51RO+Z333cXG6P7m2WvE1f0q1RnedxTbpJD8cqWur7iL0+DMnk4yz4qq+lQ+5xlnZ/F1X0q0u2/i4pYeeLk3Uq+4WI+DLHk3yxxiqvpUByZ5YP8AV1Q/xlqdsdKIvv8AGSVSt7hNR8GW+5nli/wav6VF9zLLI+NWD/FWrDyNxQL3W3p66nklheDJfcwywTfnq0f4v8kZ5Mct8Kit+kWq2ndP1obZ6Ubyp7haUZM8mWWz+d1w/wARIPJllzhW4h662G10lEbdKe8q+4NKMh9zPLvl2IeuEX3Ncvj88xA/rBbBGDZG+q+4eiJRYBlDDsFllkoaysDpWhri4g6A3VyKNw/PpXedqeDkoKpubfNklhdBptIzS88l/wBFOCmaN08nqpYOmiUDooksCeaHjHdiCXdBAywfhlZwjB9Kadhded0P1rUXRgm29cpXdRGzcRMm7CcQ3iEH9YJo4RidvyYeuFsLojfpUle1CLtosxjsHxTyUHzPCI4Rio/Mz6wWzselHr0qavqpF2kO5iu9GKn8zPrhDvNip/Mz6wW0O9BPjqgcHTZiXYNivkbvWCT3mxXyN3rBbcpKfH1BcFDyYrvNio/M3esEXejFfIz6wW33aotpNX1UODgjEd5sV8jd6wR95sW4UR9YLb7SCOOqhwkDD95MY3miPrhDvLivkh9YLbo0uOqhwkDDd5cU8m/eCPvLink37wW4RJ8fUGrSBiO8uKeTfvBDvLinkw9YLb70aOPqidpDJhu8mK8Kb94Iu8eMeSD1gtyko46qDsoPuYjvLi430o9YI+82K+S38zgtsgnx1QODgYtuC4pb8kd2o+8uKeSP7Vs0EuNqfYfBwMaMFxQfmju0I+82KeSEfrBbFBDvan2Dg4GOGD4kDrSu9BCX3nxDyZ61w3pSXG1A4OBj+8+IeSvR958Q8letgiS42qN2dMyHefEPJXod58Q8ncPOVr79SF+pHG1fAuDgY84PiHkzj5iEO8+IeSvWwv1IwjjavgFZ0zHjBq7jC4JXeWt8W5a0oWslx1QnwlMyPeat8U5DvNXeKctd6ELnoRx1QStKZku8tb4pyHeWt8W5a26F0K/qDdrDsZLvLW+LcEO8tb8gla0OshtI4+oCtYGTGDVvi3IHB63xZC1lwhtJcdMOFgZPvLWfJRjBazoWr2kNpHGTQK1h5MqcHrD8VDvPWfJWq2kNpHHTHwsDLd56zoQGEVXFv1LU7RQ2j1pcZMatoGZGEVXQexH3pqug9i0u0UCT0o4yoHDxM2MJqug9iPvVVbtlaK56ULnpRxUx8PEz3eqq+SgtDc9KCXFTDcRHkOCCCxFoSCCCAAgggpoBLt6AQQTEwnapNutBBABgaIWQQTQwWRncggmIJGEEEMAijCCCh3DsFxQQQUxgSUEEwAggggAIIIIACCCCAAggggAIIIJABBBBAARhBBABoDeggosAyEAEEFIQVkYCCCigCIQAQQQACgEEEAA2skoIIY0BBBBLAwDejKCCABwRoIJgEEXFBBDGKQQQSEf/2Q==";

const Resume = () => {
  return (
    <div className="resume-page">

      {/* ========= NAVBAR — milky purple ========= */}
      <nav className="navbar">
        <a href="#home" className="nav-logo">
          <div className="logo-icon">
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          Resume<span>+Portfolio</span>
        </a>

        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#templates">Templates</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#references">References</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>

        <div className="nav-actions">
          <button className="btn-login">Login</button>
          <button className="btn-get-started">Get Started</button>
        </div>
      </nav>

      {/* ========= HERO ========= */}
      <section className="hero" id="home">
        <div className="hero-bubble-1"></div>
        <div className="hero-bubble-2"></div>
        <div className="hero-bubble-3"></div>

        {/* LEFT — content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Now with AI-powered suggestions
          </div>

          <h1>
            Build Your Resume &amp;<br/>
            <strong>Portfolio</strong> in Minutes
          </h1>

          <p className="hero-tagline">
            We're building your career story in seconds — not hours.
          </p>

          <p className="hero-desc">
            Create a stunning, ATS-friendly resume and personal portfolio site
            with our smart builder. Choose from 50+ professionally designed
            templates, get real-time AI feedback, and export to PDF or share a
            live link — all in one place.
          </p>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">2M+</span>
              <span className="stat-label">Resumes Created</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">50+</span>
              <span className="stat-label">Templates</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">98%</span>
              <span className="stat-label">ATS Pass Rate</span>
            </div>
          </div>

          <div className="hero-buttons">
            <button className="btn-primary">Create Resume</button>
            <button className="btn-secondary">View Templates</button>
            <button className="btn-play">
              <span className="play-circle">
                <svg width="10" height="12" fill="#3b5de7" viewBox="0 0 10 12">
                  <path d="M0 0l10 6-10 6z"/>
                </svg>
              </span>
              Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT — image fills the whole right half */}
        <div className="hero-image">
          <div className="hero-img-wrap">
            <img src={HERO_IMG} alt="Resume Builder" className="hero-img" />
          </div>
        </div>
      </section>

      {/* ========= FEATURES ========= */}
      <section className="features-section" id="features">
        <div className="page-bubble page-bubble-a"></div>
        <div className="page-bubble page-bubble-b"></div>

        <h2 className="section-title">Our Features</h2>
        <p className="section-subtitle">Everything you need to land your dream job — all in one place.</p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" fill="white"/>
                <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M15 9l1.5 1.5L19 8" stroke="rgba(200,220,255,0.9)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>AI Resume Builder</h3>
            <p>Generate resumes with smart AI assistance</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="14" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                <circle cx="8" cy="8" r="2" fill="white"/>
                <path d="M3 13l4-3 4 3 4-4 6 4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="7" y="19" width="10" height="2" rx="1" fill="white"/>
              </svg>
            </div>
            <h3>Portfolio Website</h3>
            <p>Create a personal portfolio site</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <rect x="4" y="2" width="16" height="20" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M8 7h8M8 11h8M8 15h5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="18" cy="18" r="5" fill="#3b5de7" stroke="white" strokeWidth="1.5"/>
                <path d="M16 18l1.5 1.5L20 16" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>ATS Friendly Templates</h3>
            <p>HR-approved, ATS optimized designs</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path d="M12 3v13M8 12l4 4 4-4" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 17v2a2 2 0 002 2h10a2 2 0 002-2v-2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Easy Export</h3>
            <p>Download as PDF or Share as Link</p>
            <span className="feature-arrow">›</span>
          </div>
        </div>
      </section>

      {/* ========= TEMPLATES ========= */}
      <section className="templates-section" id="templates">
        <div className="page-bubble page-bubble-a"></div>
        <div className="page-bubble page-bubble-b"></div>
        <div className="page-bubble page-bubble-c"></div>

        <h2 className="section-title">Explore Our Templates</h2>
        <p className="section-subtitle">Choose from our professionally designed, ATS-friendly templates.</p>

        <div className="templates-grid">
          <div className="template-card">
            <div className="template-header">
              <div className="template-avatar av1">M</div>
              <span className="template-name">Michael Smith</span>
            </div>
            <div className="template-body">
              <div className="t-section">Timeline</div>
              <div className="t-line w100"></div><div className="t-line w80"></div>
              <div className="t-section">Future Dreams</div>
              <div className="t-line w100"></div><div className="t-line w60"></div>
              <div className="t-section">Time Stars</div>
              <div className="t-line w100"></div><div className="t-line w80"></div>
              <div className="t-section">Content</div>
              <div className="t-line w80"></div><div className="t-line w60"></div>
            </div>
          </div>

          <div className="template-card">
            <div className="template-header">
              <div className="template-avatar av2">A</div>
              <span className="template-name">Ananya Patel</span>
            </div>
            <div className="template-body">
              <div className="t-section">Basic Information</div>
              <div className="t-line w100"></div><div className="t-line w80"></div>
              <div className="t-section">Fast IT Skills</div>
              <div className="t-line w100"></div><div className="t-line w60"></div>
              <div className="t-section">Top Connections</div>
              <div className="t-line w100"></div><div className="t-line w80"></div>
              <div className="t-section">Regularity</div>
              <div className="t-line w80"></div><div className="t-line w60"></div>
            </div>
          </div>

          <div className="template-card">
            <div className="template-header template-header-dark">
              <div className="template-avatar av3">D</div>
              <span className="template-name template-name-white">David Wilson</span>
            </div>
            <div className="template-body">
              <div className="t-section">Timeline</div>
              <div className="t-line w100 t-dark"></div><div className="t-line w80 t-dark"></div>
              <div className="t-section">IT Skills</div>
              <div className="t-line w100 t-dark"></div><div className="t-line w60 t-dark"></div>
              <div className="t-section">Top Connections</div>
              <div className="t-line w100 t-dark"></div><div className="t-line w80 t-dark"></div>
              <div className="t-section">Regularity</div>
              <div className="t-line w80 t-dark"></div><div className="t-line w60 t-dark"></div>
            </div>
          </div>
        </div>

        <div className="templates-center">
          <button className="btn-browse">Browse More Templates <span>›</span></button>
        </div>
      </section>

      {/* ========= HOW IT WORKS ========= */}
      <section className="how-section" id="how-it-works">
        <div className="page-bubble page-bubble-a"></div>
        <div className="page-bubble page-bubble-b"></div>

        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Three simple steps to your perfect resume.</p>

        <div className="steps-box">
          <div className="step">
            <div className="step-icon">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M7 8h10M7 12h10M7 16h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="step-text">
              <h4>Enter Your Details</h4>
              <p>Fill in your information</p>
            </div>
          </div>

          <span className="step-chevron">›</span>

          <div className="step">
            <div className="step-icon">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                <rect x="2" y="2" width="9" height="9" rx="1.5" stroke="white" strokeWidth="2" fill="none"/>
                <rect x="13" y="2" width="9" height="9" rx="1.5" stroke="white" strokeWidth="2" fill="none"/>
                <rect x="2" y="13" width="9" height="9" rx="1.5" stroke="white" strokeWidth="2" fill="none"/>
                <rect x="13" y="13" width="9" height="9" rx="1.5" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="step-text">
              <h4>Choose Template</h4>
              <p>Select your design</p>
            </div>
          </div>

          <span className="step-chevron">›</span>

          <div className="step">
            <div className="step-icon">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="4" width="13" height="17" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                <rect x="8" y="2" width="13" height="15" rx="2" fill="rgba(255,255,255,0.22)" stroke="white" strokeWidth="2"/>
                <path d="M12 8l2 2 4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="step-text">
              <h4>Download &amp; Share</h4>
              <p>Export to PDF or Live Link</p>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-space"></div>

    </div>
  );
};

export default Resume;