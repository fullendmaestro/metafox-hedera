const WalletInfoCard = () => {
  return (
    <div className='flex flex-col space-y-2 pl-2'>
      <div className='flex justify-between p-4 bg-background-2 z-20 rounded-4'>
        <p
          data-testid='wallet-select-popup-wallet-name'
          className='typography-subheader-16 text-utility-1-default font-medium   text-unset   '
        >
          Mnemonic 6
        </p>
        <p className='typography-body-14 text-utility-1-opacity-1 font-normal   text-unset   '>
          $ 0.00
        </p>
      </div>
      {
        <div role='button' className='outline-0  cursor-pointer'>
          <div className='flex mx-2 py-2 px-4 rounded-4 justify-between items-center cursor-pointer hover:bg-line transition hover:scale-[1.01] z-0 active:scale-[1.03] undefined'>
            <div className='flex gap-2'>
              <div className='w-[36px] h-[36px] flex items-center justify-center'>
                <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swXzUwNjVfNTQ2MjQiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+CjxjaXJjbGUgY3g9IjMyIiBjeT0iMzIiIHI9IjMyIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDY0KSIgZmlsbD0iI0Q5RDlEOSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfNTA2NV81NDYyNCkiPgo8cmVjdCB3aWR0aD0iNDYuODQ4IiBoZWlnaHQ9IjY0LjUxMiIgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgMTguOTQ0MSA2NC4yNTYxKSIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzUwNjVfNTQ2MjQpIi8+CjxyZWN0IHdpZHRoPSI1OS43NjAyIiBoZWlnaHQ9IjMzLjE1NyIgdHJhbnNmb3JtPSJtYXRyaXgoMC44MTE0NTUgMC41ODQ0MTUgMC41ODQ0MTUgLTAuODExNDU1IDYuOTE3NzIgMjMuNzcpIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfNTA2NV81NDYyNCkiLz4KPHJlY3Qgd2lkdGg9IjI1LjM0NCIgaGVpZ2h0PSI2Ni4wNDgiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgNjQpIiBmaWxsPSJ1cmwoI3BhaW50Ml9saW5lYXJfNTA2NV81NDYyNCkiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzUwNjVfNTQ2MjQiIHgxPSIyMy40MjQiIHkxPSIwIiB4Mj0iMjMuNDI0IiB5Mj0iNjQuNTEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIG9mZnNldD0iMC4wNTk4NDE3IiBzdG9wLWNvbG9yPSIjRkZGNDY1Ii8+CjxzdG9wIG9mZnNldD0iMC43NzczMTYiIHN0b3AtY29sb3I9IiM0OEZGOTEiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzUwNjVfNTQ2MjQiIHgxPSIyOS44ODAxIiB5MT0iMCIgeDI9IjI5Ljg4MDEiIHkyPSIzMy4xNTciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agb2Zmc2V0PSIwLjA0NTc4NDYiIHN0b3AtY29sb3I9IiMyRUNDRkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDUwMEZGIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQyX2xpbmVhcl81MDY1XzU0NjI0IiB4MT0iMTIuNjcyIiB5MT0iMCIgeDI9IjEyLjY3MiIgeTI9IjY2LjA0OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMDU5ODQxNyIgc3RvcC1jb2xvcj0iI0ZGRjhBMyIvPgo8c3RvcCBvZmZzZXQ9IjAuNzc3MzE2IiBzdG9wLWNvbG9yPSIjRkZBRUZFIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==' />
              </div>
              <div className='flex flex-col'>
                <p
                  data-testid='wallet-select-popup-account-name'
                  className='typography-subheader-14 text-utility-1-default font-medium   text-unset   '
                >
                  Account 1
                </p>
                <div className='flex justify-between'>
                  <div>
                    <p className='typography-body-14 text-utility-1-opacity-1 font-normal   text-unset   '>
                      $ 0.00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='space-y-4' id='headlessui-radiogroup-:r4i:' role='radiogroup'>
                <span
                  className='radio-group__option'
                  id='headlessui-radio-:r4j:'
                  role='radio'
                  aria-checked='true'
                  data-headlessui-state='checked'
                  data-checked=''
                >
                  <span className='radio-group__option-indicator'></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      }
      <div
        className='flex w-full'
        data-tooltip-id='button-tooltip-82'
        data-tooltip-place='top-end'
        data-tooltip-role='tooltip'
      >
        <button
          data-testid='wallet-select-popup-add-account-button'
          type='button'
          className='outline-none bg-utility-1-opacity-6 text-utility-1-default hover:bg-utility-1-opacity-5 active:bg-utility-1-opacity-4 py-2 px-4 text-subheader-14 leading-subheader-14 h-9 default-button  w-full  '
        >
          <div className='mx-0.5'>
            <p className='body-text text-utility-1-default font-medium   text-unset   '>
              Add account
            </p>
          </div>
          <span className='pl-1.5'>
            <svg
              className='text-utility-1-default'
              fill='none'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M13.5383 3.53846C13.5383 2.68879 12.8495 2 11.9998 2C11.1502 2 10.4614 2.68879 10.4614 3.53846V10.4615H3.53828C2.68861 10.4615 1.99982 11.1503 1.99982 12C1.99982 12.8497 2.68861 13.5385 3.53828 13.5385H10.4614V20.4615C10.4614 21.3112 11.1502 22 11.9998 22C12.8495 22 13.5383 21.3112 13.5383 20.4615V13.5385H20.4614C21.311 13.5385 21.9998 12.8497 21.9998 12C21.9998 11.1503 21.311 10.4615 20.4614 10.4615H13.5383V3.53846Z'
                fill='currentColor'
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}

export default WalletInfoCard
