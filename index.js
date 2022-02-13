<html>
    <head>
        <title>TikTok Video Downloader</title>
        <link rel="icon" type="image/x-icon" href="https://cdn.discordapp.com/attachments/932849692147064872/942051088633303050/favicon.ico">
        <style>
            body {
                margin: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: #000000;
            }

            h1,
            h2 {
                color: #fff;
            }

            h1 {
                margin-top: 6rem;
                font-size: 3rem;
            }

            h2 {
                margin-top: 1rem;
                margin-bottom: 1rem;
                font-size: 1.5rem;
                font-weight: 400;
            }

            form {
                display: flex;
                flex-direction: row;
            }

            input[name="url"] {
                border-color: #000000;
                background-color: #fff;
                border-width: 0;
                color: #000000;
                outline: none;
                padding: 4px 6px;
            }

            button {
                padding: 4px 6px;
                background-color: #20bf6b;
                color: white;
                outline: none;
                border:  none;
            }
        </style>
    </head>
    <body>
        <center><h1>TikTok Video Downloader</h1></center>
        <form id="form" method="POST" action="/download">
            <input type="text" name="url" required="required" placeholder="Paste Link Here!" />
            <button>Download!</button>
        </form>
        <script>
            const form = document.getElementById('form')
            const input = document.querySelector('input[name="url"]')
            const button = document.querySelector('button')
            form.addEventListener('submit', function onSubmit(e) {
                if(input.value.includes("tiktok.com/")) {
                e.preventDefault()
                input.disabled = true
                button.innerText = 'Please wait...'
                fetch('/download', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        url: input.value,
                    })
                })
                    .then(res => {
                        const name = res.headers.get('Content-Disposition').split(' ')[1].split('=')[1]
                        
                        return res.blob().then((blob) => {
                            return {
                                blob,
                                name,
                            }
                        })
                    })
                    .then(({
                        blob,
                        name
                    }) => {
                        input.disabled = false
                        input.value = ''
                        button.innerText = 'Download!'

                        const href = window.URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = href
                        a.download = name
                        a.click()
                    })
            }else {
                alert('Invaid Link!')
                window.location="/"
            }})
        </script>
    </body>
</html>