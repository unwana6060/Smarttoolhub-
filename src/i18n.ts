import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app_name: "SmartTools Hub",
      back_home: "Back to Home",
      home_title: "All-in-One Utility Suite",
      home_subtitle: "Free, professional tools for documents, images, and calculations. No setup required.",
      footer: {
        about: "About & How to Use",
        contact: "Contact Us",
        privacy: "Privacy Policy",
        terms: "Terms & Disclaimer"
      },
      auth: {
        title: "Sign in to save your history",
        subtitle: "Secure your tool usage data across devices.",
        btn: "Sign in with Google",
        sign_in: "Sign In",
        sign_up: "Sign Up",
        sign_out: "Sign Out",
        sign_in_email: "Sign In with Email",
        admin: "Admin",
        unauthorized: "Unauthorized domain. Please add this URL to Firebase Console > Auth > Settings.",
        display_name: "Full Name",
        email: "Email Address",
        password: "Password",
        loading: "Processing...",
        submit_sign_up: "Create Account",
        submit_sign_in: "Sign In",
        or_separator: "OR",
        already_account: "Already have an account? Sign In",
        no_account: "Don't have an account? Sign Up"
      },
      common: {
        calculate: "Calculate",
        result: "Result",
        error: "Error",
        copy: "Copy",
        copied: "Copied",
        clear: "Clear",
        length: "Length",
        download: "Download",
        start_over: "Start Over",
        drop_file: "Drop your file here",
        or_click: "or click to browse",
        select_multiple: "Select multiple files",
        select_one: "Select one file",
        selected_files: "Selected Files",
        click_to_upload: "Click to upload",
        select_language: "Select Language",
        years: "Years",
        months: "Months",
        days: "Days"
      },
      ads: {
        banner: {
          text: "Advertisement Space"
        },
        interstitial: {
          tag: "Advertisement",
          title: "Premium Sponsor",
          subtitle: "This interstitial ad keeps SmartTools Hub free for you.",
          skip: "Skip in {{count}}",
          close: "Close Ad"
        }
      },
      tools: {
        "pdf-tool": {
          name: "PDF Tool",
          desc: "Merge or split PDF documents instantly.",
          merge: "Merge PDFs",
          split: "Split PDF",
          merging: "Merging...",
          splitting: "Splitting...",
          merge_download: "Merge & Download PDF",
          split_download: "Split & Download PDF",
          range: "Page Range",
          errors: {
            at_least_two: "Please add at least 2 PDFs to merge.",
            failed_merge: "Failed to merge PDFs. Please ensure they are valid non-encrypted PDFs.",
            failed_split: "Failed to split PDF. Ensure it is a valid non-encrypted PDF.",
            upload_pdf_range: "Please upload a PDF and specify a valid page range.",
            invalid_range: "Invalid format. Use \"1-3\" or just a single page number like \"2\".",
            invalid_values: "Invalid page range values.",
            pages_limit: "Original PDF only has {{count}} pages."
          }
        },
        "emi-calculator": {
          name: "Loan Calculator",
          desc: "Professional EMI amortization estimation",
          loan_amount: "Loan Amount",
          interest_rate: "Interest Rate",
          tenure: "Tenure",
          monthly_emi: "Monthly Payment (EMI)",
          total_interest: "Total Interest",
          total_payment: "Total Payment",
          units: {
            years: "Years",
            percent: "%"
          }
        },
        "image-compressor": {
          name: "Image Compressor",
          desc: "Batch compress JPG/PNG while preserving quality.",
          compress: "Compress Now",
          compressing: "Compressing...",
          you_saved: "You saved",
          space: "space!",
          original: "Original",
          compressed: "Compressed",
          formats: "(JPG, PNG, WebP)",
          errors: {
            invalid_image: "Please upload a valid image file (JPG/PNG).",
            failed_compression: "Failed to compress image."
          }
        },
        "word-counter": {
          name: "Word Counter",
          desc: "Detailed real-time text analysis statistics.",
          stats: {
            words: "Words",
            chars: "Characters",
            chars_no_space: "Chars (no space)",
            sentences: "Sentences",
            paragraphs: "Paragraphs",
            reading_time: "Reading Time"
          },
          placeholder: "Type or paste your text here...",
          units: {
            mins: "min",
            sec: "sec"
          }
        },
        "currency-converter": {
          name: "Currency Converter",
          desc: "Live exchange rates in your browser.",
          amount: "Amount",
          from: "From",
          to: "To",
          rate: "Exchange Rate",
          fetching: "Fetching real-time rates...",
          last_updated: "Last updated",
          errors: {
            failed_fetch: "Failed to fetch exchange rates. Please check your connection."
          }
        },
        "seo-analyzer": {
          name: "SEO Analyzer",
          desc: "Scan a website's core SEO tags.",
          analyze: "Analyze",
          title: "Page Title",
          description: "Meta Description",
          url: "Website URL",
          analyzing: "Analyzing...",
          keywords: "Keywords",
          headings: "Headings",
          not_found: "Not found",
          score: "Score",
          out_of_100: "out of 100",
          suggestions_title: "Suggestions",
          errors: {
            invalid_url: "Please enter a valid URL.",
            failed_analysis: "Failed to analyze the URL. The website might block automated requests or be unreachable."
          },
          suggestions: {
            missing_title: "Missing <title> tag. Add a descriptive title.",
            title_length: "Title length should ideally be between 30 and 60 characters.",
            missing_desc: "Missing meta description. Add a summary of the page content.",
            desc_length: "Meta description should ideally be between 50 and 160 characters.",
            missing_h1: "Missing <h1> heading. Use exactly one H1 per page.",
            multiple_h1: "Multiple <h1> headings found. Consider using only one H1.",
            missing_alt: "Found {{count}} image(s) missing 'alt' attributes."
          }
        },
        "password-generator": {
          name: "Password Generator",
          desc: "Create secure, random passwords.",
          generate: "Generate Password",
          length: "Length",
          uppercase: "Uppercase",
          lowercase: "Lowercase",
          numbers: "Numbers",
          symbols: "Symbols",
          select_option: "Select at least one option",
          options: {
            uppercase: "Uppercase (A-Z)",
            lowercase: "Lowercase (a-z)",
            numbers: "Numbers (0-9)",
            symbols: "Symbols (!@#$)"
          }
        },
        "json-formatter": {
          name: "JSON Formatter",
          desc: "Beautify & Validate JSON",
          beautify: "Format JSON",
          invalid: "Invalid JSON",
          placeholder: "Paste raw JSON here...",
          output_placeholder: "Formatted JSON will appear here..."
        },
        "age-calculator": {
          name: "Age Calculator",
          desc: "Calculate your exact age.",
          dob: "Date of Birth",
          age_is: "Your Exact Age is",
          years: "Years",
          months: "Months",
          days: "Days"
        },
        "bmi-calculator": {
          name: "BMI Calculator",
          desc: "Check your Body Mass Index.",
          weight: "Weight",
          height: "Height",
          underweight: "Underweight",
          normal: "Normal",
          overweight: "Overweight",
          obese: "Obese",
          metric: "Metric",
          imperial: "Imperial",
          units: {
            kg: "kg",
            lbs: "lbs",
            cm: "cm",
            inches: "inches"
          }
        }
      }
    }
  },
  fr: {
    translation: {
      app_name: "SmartTools Hub",
      back_home: "Retour à l'accueil",
      home_title: "Suite utilitaire tout-en-un",
      home_subtitle: "Outils professionnels gratuits pour documents, images et calculs.",
      footer: {
        about: "À propos et utilisation",
        contact: "Contactez-nous",
        privacy: "Politique de confidentialité",
        terms: "Conditions et Avis de non-responsabilité"
      },
      auth: {
        title: "Connectez-vous pour sauvegarder votre historique",
        subtitle: "Sécurisez vos données sur tous vos appareils.",
        btn: "Se connecter avec Google",
        sign_in: "Se connecter",
        sign_up: "S'inscrire",
        sign_out: "Se déconnecter",
        sign_in_email: "Se connecter par e-mail",
        admin: "Admin",
        unauthorized: "Domaine non autorisé. Veuillez ajouter cette URL dans la console Firebase.",
        display_name: "Nom complet",
        email: "Adresse e-mail",
        password: "Mot de passe",
        loading: "Traitement...",
        submit_sign_up: "Créer un compte",
        submit_sign_in: "Se connecter",
        or_separator: "OU",
        already_account: "Vous avez déjà un compte ? Se connecter",
        no_account: "Pas encore de compte ? S'inscrire"
      },
      common: {
        calculate: "Calculer",
        result: "Résultat",
        error: "Erreur",
        copy: "Copier",
        copied: "Copié",
        clear: "Effacer",
        length: "Longueur",
        download: "Télécharger",
        start_over: "Recommencer",
        drop_file: "Déposez votre fichier ici",
        or_click: "ou cliquez pour parcourir",
        select_multiple: "Sélectionner plusieurs fichiers",
        select_one: "Sélectionner un fichier",
        selected_files: "Fichiers sélectionnés",
        click_to_upload: "Cliquez pour télécharger",
        select_language: "Choisir la langue",
        years: "Ans",
        months: "Mois",
        days: "Jours"
      },
      ads: {
        banner: {
          text: "Espace publicitaire"
        },
        interstitial: {
          tag: "Publicité",
          title: "Sponsor Premium",
          subtitle: "Cette publicité permet de garder SmartTools Hub gratuit.",
          skip: "Passer dans {{count}}",
          close: "Fermer"
        }
      },
      tools: {
        "pdf-tool": {
          name: "Outil PDF",
          desc: "Fusionnez ou divisez des documents PDF.",
          merge: "Fusionner des PDF",
          split: "Diviser un PDF",
          merging: "Fusion...",
          splitting: "Division...",
          merge_download: "Fusionner et télécharger",
          split_download: "Diviser et télécharger",
          range: "Plage de pages"
        },
        "emi-calculator": {
          name: "Calculateur de prêt",
          desc: "Estimation professionnelle de l'amortissement",
          loan_amount: "Montant du prêt",
          interest_rate: "Taux d'intérêt",
          tenure: "Durée",
          monthly_emi: "Mensualité (EMI)",
          total_interest: "Intérêt total",
          total_payment: "Paiement total"
        },
        "image-compressor": {
          name: "Compresseur d'image",
          desc: "Compressez JPG/PNG sans perte de qualité.",
          compress: "Compresser maintenant",
          compressing: "Compression...",
          you_saved: "Économie de",
          space: "d'espace !"
        },
        "word-counter": {
          name: "Compteur de mots",
          desc: "Analyse de texte détaillée en temps réel.",
          stats: {
            words: "Mots",
            chars: "Caractères",
            chars_no_space: "Caractères (sans espaces)",
            sentences: "Phrases",
            paragraphs: "Paragraphes",
            reading_time: "Temps de lecture"
          },
          placeholder: "Tapez ou collez votre texte ici..."
        },
        "currency-converter": {
          name: "Convertisseur de devise",
          desc: "Taux de change en direct.",
          amount: "Montant",
          from: "De",
          to: "À"
        },
        "seo-analyzer": {
          name: "Analyseur SEO",
          desc: "Balises SEO de base d'un site web.",
          analyze: "Analyser",
          title: "Titre de la page",
          description: "Méta description"
        },
        "password-generator": {
          name: "Générateur de mot de passe",
          desc: "Mots de passe sécurisés et aléatoires.",
          generate: "Générer le mot de passe",
          length: "Longueur",
          uppercase: "Majuscules",
          lowercase: "Minuscules",
          numbers: "Nombres",
          symbols: "Symboles"
        },
        "json-formatter": {
          name: "Formateur JSON",
          desc: "Embellir et valider JSON",
          beautify: "Formater JSON",
          invalid: "JSON invalide"
        },
        "age-calculator": {
          name: "Calculateur d'âge",
          desc: "Calculez votre âge exact.",
          dob: "Date de naissance",
          age_is: "Votre âge exact est",
          years: "Ans",
          months: "Mois",
          days: "Jours"
        },
        "bmi-calculator": {
          name: "Calculateur d'IMC",
          desc: "Vérifiez votre indice de masse corporelle.",
          weight: "Poids",
          height: "Taille",
          underweight: "Insuffisance pondérale",
          normal: "Normal",
          overweight: "Surpoids",
          obese: "Obèse"
        }
      }
    }
  },
  es: {
    translation: {
      app_name: "SmartTools Hub",
      back_home: "Volver al inicio",
      home_title: "Suite de utilidades todo en uno",
      home_subtitle: "Herramientas profesionales para documentos, imágenes y cálculos.",
      footer: {
        about: "Acerca de y Cómo usar",
        contact: "Contacto",
        privacy: "Política de privacidad",
        terms: "Términos y descargo de responsabilidad"
      },
      auth: {
        title: "Inicia sesión para guardar historial",
        subtitle: "Asegura tus datos en todos tus dispositivos.",
        btn: "Iniciar sesión con Google",
        sign_in: "Iniciar sesión",
        sign_up: "Registrarse",
        sign_out: "Cerrar sesión",
        sign_in_email: "Iniciar sesión con email",
        admin: "Admin",
        unauthorized: "Dominio no autorizado. Añade esta URL en Firebase Console.",
        display_name: "Nombre completo",
        email: "Correo electrónico",
        password: "Contraseña",
        loading: "Procesando...",
        submit_sign_up: "Crear cuenta",
        submit_sign_in: "Iniciar sesión",
        or_separator: "O",
        already_account: "¿Ya tienes una cuenta? Iniciar sesión",
        no_account: "¿No tienes una cuenta? Registrarse"
      },
      common: {
        calculate: "Calcular",
        result: "Resultado",
        error: "Error",
        copy: "Copiar",
        copied: "Copiado",
        clear: "Limpiar",
        length: "Longitud",
        download: "Descargar",
        start_over: "Reiniciar",
        drop_file: "Suelta tu archivo aquí",
        or_click: "o haz clic para buscar",
        select_multiple: "Seleccionar varios archivos",
        select_one: "Seleccionar un archivo",
        selected_files: "Archivos seleccionados",
        click_to_upload: "Clic para subir",
        select_language: "Seleccionar Idioma",
        years: "Años",
        months: "Meses",
        days: "Días"
      },
      ads: {
        banner: {
          text: "Espacio publicitario"
        },
        interstitial: {
          tag: "Publicidad",
          title: "Sponsor Premium",
          subtitle: "Este anuncio mantiene SmartTools Hub gratuito.",
          skip: "Saltar en {{count}}",
          close: "Cerrar"
        }
      },
      tools: {
        "pdf-tool": {
          name: "Herramienta PDF",
          desc: "Fusiona o divide documentos PDF.",
          merge: "Fusionar PDFs",
          split: "Dividir PDF",
          merging: "Fusionando...",
          splitting: "Dividiendo...",
          merge_download: "Fusionar y descargar",
          split_download: "Dividir y descargar",
          range: "Rango de páginas"
        },
        "emi-calculator": {
          name: "Calculadora de préstamos",
          desc: "Estimación profesional de amortización",
          loan_amount: "Monto del préstamo",
          interest_rate: "Tasa de interés",
          tenure: "Plazo",
          monthly_emi: "Pago mensual (EMI)",
          total_interest: "Interés total",
          total_payment: "Pago total"
        },
        "image-compressor": {
          name: "Compresor de imágenes",
          desc: "Comprime JPG/PNG manteniendo la calidad.",
          compress: "Comprimir ahora",
          compressing: "Comprimiendo...",
          you_saved: "Ahorraste un",
          space: "de espacio!"
        },
        "word-counter": {
          name: "Contador de palabras",
          desc: "Estadísticas de análisis de texto en tiempo real.",
          stats: {
            words: "Palabras",
            chars: "Caracteres",
            chars_no_space: "Caracteres (sin espacios)",
            sentences: "Oraciones",
            paragraphs: "Párrafos",
            reading_time: "Tiempo de lectura"
          },
          placeholder: "Escribe o pega tu texto aquí..."
        },
        "currency-converter": {
          name: "Convertidor de divisas",
          desc: "Tipos de cambio en vivo.",
          amount: "Monto",
          from: "De",
          to: "A"
        },
        "seo-analyzer": {
          name: "Analizador SEO",
          desc: "Etiquetas SEO básicas de un sitio web.",
          analyze: "Analizar",
          title: "Título de la página",
          description: "Metadescripción"
        },
        "password-generator": {
          name: "Generador de contraseñas",
          desc: "Contraseñas seguras y aleatorias.",
          generate: "Generar contraseña",
          length: "Longitud",
          uppercase: "Mayúsculas",
          lowercase: "Minúsculas",
          numbers: "Números",
          symbols: "Símbolos"
        },
        "json-formatter": {
          name: "Formateador JSON",
          desc: "Embellecer y validar JSON",
          beautify: "Formatear JSON",
          invalid: "JSON inválido"
        },
        "age-calculator": {
          name: "Calculadora de edad",
          desc: "Calcula tu edad exacta.",
          dob: "Fecha de nacimiento",
          age_is: "Tu edad exacta es",
          years: "Años",
          months: "Meses",
          days: "Días"
        },
        "bmi-calculator": {
          name: "Calculadora de IMC",
          desc: "Consulta tu índice de masa corporal.",
          weight: "Peso",
          height: "Altura",
          underweight: "Bajo peso",
          normal: "Normal",
          overweight: "Sobrepeso",
          obese: "Obeso"
        }
      }
    }
  },
  de: {
    translation: {
      app_name: "SmartTools Hub",
      back_home: "Zurück zur Startseite",
      home_title: "All-in-One Utility-Suite",
      home_subtitle: "Kostenlose Profi-Tools für Dokumente, Bilder und Berechnungen.",
      auth: {
        title: "Anmelden, um Verlauf zu speichern",
        subtitle: "Sichern Sie Ihre Daten geräteübergreifend.",
        btn: "Mit Google anmelden"
      },
      common: {
        calculate: "Berechnen",
        result: "Ergebnis",
        error: "Fehler",
        copy: "Kopieren",
        copied: "Kopiert",
        clear: "Löschen",
        length: "Länge",
        download: "Herunterladen",
        start_over: "Neustart",
        drop_file: "Datei hier ablegen",
        or_click: "oder zum Durchsuchen klicken",
        select_multiple: "Mehrere Dateien wählen",
        select_one: "Eine Datei wählen",
        selected_files: "Ausgewählte Dateien",
        click_to_upload: "Zum Hochladen klicken"
      },
      tools: {
        "pdf-tool": {
          name: "PDF-Tool",
          desc: "PDFs sofort zusammenführen oder teilen.",
          merge: "PDFs zusammenführen",
          split: "PDF teilen",
          merging: "Führe zusammen...",
          splitting: "Teile...",
          merge_download: "Merge & Herunterladen",
          split_download: "Teilen & Herunterladen",
          range: "Seitenbereich"
        },
        "emi-calculator": {
          name: "Kreditrechner",
          desc: "Professionelle EMI-Schätzung",
          loan_amount: "Kreditbetrag",
          interest_rate: "Zinssatz",
          tenure: "Laufzeit",
          monthly_emi: "Monatliche Rate (EMI)",
          total_interest: "Zinsen gesamt",
          total_payment: "Zahlung gesamt"
        },
        "image-compressor": {
          name: "Bildkomprimierer",
          desc: "JPG/PNG-Stapelkomprimierung mit Qualität.",
          compress: "Jetzt komprimieren",
          compressing: "Komprimiere...",
          you_saved: "Gespart:",
          space: "Speicherplatz!"
        },
        "word-counter": {
          name: "Wortzähler",
          desc: "Detaillierte Echtzeit-Textstatistik.",
          stats: {
            words: "Wörter",
            chars: "Zeichen",
            chars_no_space: "Zeichen (ohne Leerzeichen)",
            sentences: "Sätze",
            paragraphs: "Absätze",
            reading_time: "Lesezeit"
          },
          placeholder: "Text hier eingeben oder einfügen..."
        },
        "currency-converter": {
          name: "Währungsrechner",
          desc: "Live-Wechselkurse im Browser.",
          amount: "Betrag",
          from: "Von",
          to: "Zu"
        },
        "seo-analyzer": {
          name: "SEO-Analysator",
          desc: "Kern-SEO-Tags einer Website scannen.",
          analyze: "Analysieren",
          title: "Seitentitel",
          description: "Meta-Beschreibung"
        },
        "password-generator": {
          name: "Passwortgenerator",
          desc: "Sichere Zufallspasswörter erstellen.",
          generate: "Passwort generieren",
          length: "Länge",
          uppercase: "Großbuchstaben",
          lowercase: "Kleinbuchstaben",
          numbers: "Zahlen",
          symbols: "Symbole"
        },
        "json-formatter": {
          name: "JSON-Formatierer",
          desc: "JSON verschönern und validieren",
          beautify: "JSON formatieren",
          invalid: "Ungültiges JSON"
        },
        "age-calculator": {
          name: "Altersrechner",
          desc: "Berechnen Sie Ihr genaues Alter.",
          dob: "Geburtsdatum",
          age_is: "Ihr genaues Alter ist",
          years: "Jahre",
          months: "Monate",
          days: "Tage"
        },
        "bmi-calculator": {
          name: "BMI-Rechner",
          desc: "Body-Mass-Index prüfen.",
          weight: "Gewicht",
          height: "Größe",
          underweight: "Untergewicht",
          normal: "Normal",
          overweight: "Übergewicht",
          obese: "Adipositas"
        }
      }
    }
  },
  zh: {
    translation: {
      app_name: "SmartTools Hub",
      back_home: "返回首页",
      home_title: "多合一工具箱",
      home_subtitle: "免费、专业的文档、图像和计算工具。",
      auth: {
        title: "登录以保存历史记录",
        subtitle: "在设备间同步使用数据。",
        btn: "通过 Google 登录"
      },
      common: {
        calculate: "计算",
        result: "结果",
        error: "错误",
        copy: "复制",
        copied: "已复制",
        clear: "清空",
        length: "长度",
        download: "下载",
        start_over: "重新开始",
        drop_file: "将文件拖到此处",
        or_click: "或点击浏览",
        select_multiple: "选择多个文件",
        select_one: "选择一个文件",
        selected_files: "选定的文件",
        click_to_upload: "点击上传"
      },
      tools: {
        "pdf-tool": {
          name: "PDF 工具",
          desc: "即时合并或拆分 PDF 文档。",
          merge: "合并 PDF",
          split: "拆分 PDF",
          merging: "合并中...",
          splitting: "拆分中...",
          merge_download: "合并并下载",
          split_download: "拆分并下载",
          range: "页面范围"
        },
        "emi-calculator": {
          name: "贷款计算器",
          desc: "专业 EMI 摊销估算",
          loan_amount: "贷款金额",
          interest_rate: "利率",
          tenure: "期限",
          monthly_emi: "月供 (EMI)",
          total_interest: "总利息",
          total_payment: "总付款"
        },
        "image-compressor": {
          name: "图像压缩",
          desc: "批量压缩 JPG/PNG 并保持质量。",
          compress: "立即压缩",
          compressing: "压缩中...",
          you_saved: "您节省了",
          space: "空间！"
        },
        "word-counter": {
          name: "字数统计",
          desc: "实时文本分析统计。",
          stats: {
            words: "单词",
            chars: "字符",
            chars_no_space: "字符（不含空格）",
            sentences: "句子",
            paragraphs: "段落",
            reading_time: "阅读时间"
          },
          placeholder: "在此输入或粘贴文本..."
        },
        "currency-converter": {
          name: "汇率转换",
          desc: "浏览器实时汇率。",
          amount: "金额",
          from: "从",
          to: "到"
        },
        "seo-analyzer": {
          name: "SEO 分析",
          desc: "扫描网站的核心 SEO 标签。",
          analyze: "分析",
          title: "页面标题",
          description: "元描述"
        },
        "password-generator": {
          name: "密码生成",
          desc: "创建安全随机密码。",
          generate: "生成密码",
          length: "长度",
          uppercase: "大写",
          lowercase: "小写",
          numbers: "数字",
          symbols: "符号"
        },
        "json-formatter": {
          name: "JSON 格式化",
          desc: "美化并验证 JSON",
          beautify: "格式化 JSON",
          invalid: "无效 JSON"
        },
        "age-calculator": {
          name: "年龄计算器",
          desc: "计算您的准确年龄。",
          dob: "出生日期",
          age_is: "您的准确年龄是",
          years: "岁",
          months: "月",
          days: "天"
        },
        "bmi-calculator": {
          name: "BMI 计算器",
          desc: "检查您的体重指数。",
          weight: "体重",
          height: "身高",
          underweight: "体重过轻",
          normal: "正常",
          overweight: "超重",
          obese: "肥胖"
        }
      }
    }
  },
  ja: {
    translation: {
      app_name: "SmartTools Hub",
      back_home: "ホームに戻る",
      home_title: "オールインワン・ユーティリティ・スイート",
      home_subtitle: "ドキュメント、画像、計算のための無料プロフェッショナル・ツール。",
      auth: {
        title: "履歴を保存するにはサインイン",
        subtitle: "デバイス間でデータを同期します。",
        btn: "Googleでサインイン"
      },
      common: {
        calculate: "計算",
        result: "結果",
        error: "エラー",
        copy: "コピー",
        copied: "コピー済み",
        clear: "クリア",
        length: "長さ",
        download: "ダウンロード",
        start_over: "最初から",
        drop_file: "ファイルをドロップ",
        or_click: "またはクリックして選択",
        select_multiple: "複数ファイル選択",
        select_one: "1つのファイルを選択",
        selected_files: "選択されたファイル",
        click_to_upload: "クリックしてアップロード"
      },
      tools: {
        "pdf-tool": {
          name: "PDFツール",
          desc: "PDFドキュメントを即座に結合または分割。",
          merge: "PDF結合",
          split: "PDF分割",
          merging: "結合中...",
          splitting: "分割中...",
          merge_download: "結合してダウンロード",
          split_download: "分割してダウンロード",
          range: "ページ範囲"
        },
        "emi-calculator": {
          name: "ローン計算機",
          desc: "EMI償還のプロフェッショナル推定",
          loan_amount: "ローン金額",
          interest_rate: "金利",
          tenure: "期間",
          monthly_emi: "月々の支払い (EMI)",
          total_interest: "利息合計",
          total_payment: "支払い合計"
        },
        "image-compressor": {
          name: "画像圧縮",
          desc: "品質を維持しながら一括圧縮。",
          compress: "今すぐ圧縮",
          compressing: "圧縮中...",
          you_saved: "削減量:",
          space: "！"
        },
        "word-counter": {
          name: "文字数カウント",
          desc: "詳細なリアルタイム分析統計。",
          stats: {
            words: "単語数",
            chars: "文字数",
            chars_no_space: "文字数 (空白なし)",
            sentences: "文章数",
            paragraphs: "段落数",
            reading_time: "読了時間"
          },
          placeholder: "ここにテキストを入力または貼り付け..."
        },
        "currency-converter": {
          name: "通貨コンバーター",
          desc: "リアルタイムの為替レート。",
          amount: "金額",
          from: "元",
          to: "先"
        },
        "seo-analyzer": {
          name: "SEOアナライザー",
          desc: "ウェブサイトのコアSEOタグをスキャン。",
          analyze: "分析する",
          title: "ページタイトル",
          description: "メタディスクリプション"
        },
        "password-generator": {
          name: "パスワード生成",
          desc: "安全なランダムパスワードを作成。",
          generate: "生成する",
          length: "長さ",
          uppercase: "大文字",
          lowercase: "小文字",
          numbers: "数字",
          symbols: "記号"
        },
        "json-formatter": {
          name: "JSON整形",
          desc: "JSONの美化と検証",
          beautify: "整形する",
          invalid: "無効なJSON"
        },
        "age-calculator": {
          name: "年齢計算機",
          desc: "あなたの正確な年齢を計算。",
          dob: "生年月日",
          age_is: "あなたの正確な年齢は",
          years: "歳",
          months: "ヶ月",
          days: "日"
        },
        "bmi-calculator": {
          name: "BMI計算機",
          desc: "体格指数をチェック。",
          weight: "体重",
          height: "身長",
          underweight: "低体重",
          normal: "普通",
          overweight: "過体重",
          obese: "肥満"
        }
      }
    }
  },
  pt: {
    translation: {
      app_name: "SmartTools Hub",
      back_home: "Voltar ao Início",
      home_title: "Conjunto de utilitários tudo-em-um",
      home_subtitle: "Ferramentas profissionais gratuitas para documentos e cálculos.",
      auth: {
        title: "Entre para salvar seu histórico",
        subtitle: "Sincronize seus dados entre dispositivos.",
        btn: "Entrar com Google"
      },
      common: {
        calculate: "Calcular",
        result: "Resultado",
        error: "Erro",
        copy: "Copiar",
        copied: "Copiado",
        clear: "Limpar",
        length: "Comprimento",
        download: "Baixar",
        start_over: "Recomeçar",
        drop_file: "Solte seu arquivo aqui",
        or_click: "ou clique para navegar",
        selected_files: "Arquivos selecionados",
        click_to_upload: "Clique para carregar"
      },
      tools: {
        "pdf-tool": {
          name: "Ferramenta PDF",
          desc: "Mescle ou divida PDFs instantaneamente.",
          merge: "Mesclar PDFs",
          split: "Dividir PDF",
          merging: "Mesclando...",
          splitting: "Dividindo...",
          merge_download: "Mesclar e Baixar",
          range: "Intervalo de Páginas"
        },
        "emi-calculator": {
          name: "Calculadora de Empréstimo",
          desc: "Estimativa profissional de amortização",
          loan_amount: "Valor do Empréstimo",
          interest_rate: "Taxa de Juros",
          tenure: "Prazo",
          monthly_emi: "Parcela Mensal (EMI)",
          total_interest: "Juros Totais",
          total_payment: "Pagamento Total"
        },
        "image-compressor": {
          name: "Compressor de Imagem",
          desc: "Comprima JPG/PNG mantendo a qualidade.",
          compress: "Comprimir Agora",
          compressing: "Comprimindo...",
          you_saved: "Você economizou",
          space: "de espaço!"
        },
        "word-counter": {
          name: "Contador de Palavras",
          desc: "Estatísticas de texto em tempo real.",
          stats: {
            words: "Palavras",
            chars: "Caracteres",
            chars_no_space: "Caracteres (sem espaços)",
            sentences: "Frases",
            paragraphs: "Parágrafos",
            reading_time: "Tempo de Leitura"
          },
          placeholder: "Digite ou cole seu texto aqui..."
        },
        "currency-converter": {
          name: "Conversor de Moeda",
          desc: "Câmbio em tempo real no navegador.",
          amount: "Valor",
          from: "De",
          to: "Para"
        },
        "seo-analyzer": {
          name: "Analisador SEO",
          desc: "Escaneie as tags SEO de um site.",
          analyze: "Analisar",
          title: "Título da Página",
          description: "Metadescrição"
        },
        "password-generator": {
          name: "Gerador de Senha",
          desc: "Crie senhas seguras e aleatórias.",
          generate: "Gerar Senha",
          length: "Comprimento",
          uppercase: "Maiúsculas",
          lowercase: "Minúsculas",
          numbers: "Números",
          symbols: "Símbolos"
        },
        "json-formatter": {
          name: "Formatador JSON",
          desc: "Embelezar e validar JSON",
          beautify: "Formatar JSON",
          invalid: "JSON Inválido"
        },
        "age-calculator": {
          name: "Calculadora de Idade",
          desc: "Calcule sua idade exata.",
          dob: "Data de Nascimento",
          age_is: "Sua idade exata é",
          years: "Anos",
          months: "Meses",
          days: "Dias"
        },
        "bmi-calculator": {
          name: "Calculadora de IMC",
          desc: "Verifique seu índice de massa corporal.",
          weight: "Peso",
          height: "Altura",
          underweight: "Abaixo do peso",
          normal: "Normal",
          overweight: "Sobrepeso",
          obese: "Obeso"
        }
      }
    }
  },
  hi: {
    translation: {
      app_name: "SmartTools Hub",
      back_home: "होम पर वापस",
      home_title: "ऑल-इन-वन यूटिलिटी सुइट",
      home_subtitle: "दस्तावेज़ों, छवियों और गणनाओं के लिए मुफ़्त उपकरण।",
      auth: {
        title: "इतिहास सहेजने के लिए साइन इन करें",
        subtitle: "अपने डेटा को सिंक करें।",
        btn: "Google के साथ साइन इन"
      },
      common: {
        calculate: "गणना करें",
        result: "परिणाम",
        error: "त्रुटि",
        copy: "कॉपी करें",
        copied: "कॉपी हो गया",
        clear: "साफ़ करें",
        length: "लंबाई",
        download: "डाउनलोड करें",
        start_over: "फिर से शुरू करें",
        drop_file: "फ़ाइल यहाँ छोड़ें",
        or_click: "या क्लिक करें",
        selected_files: "चयनित फ़ाइलें",
        click_to_upload: "अपलोड करें"
      },
      tools: {
        "pdf-tool": {
          name: "पीडीएफ टूल",
          desc: "PDF को मिलाएँ या अलग करें।",
          merge: "PDF मिलाएँ",
          split: "PDF अलग करें",
          merging: "मिलाया जा रहा है...",
          splitting: "अलग किया जा रहा है...",
          range: "पेज रेंज"
        },
        "emi-calculator": {
          name: "ऋण कैलकुलेटर",
          desc: "प्रोफेशनल EMI अनुमान",
          loan_amount: "ऋण राशि",
          interest_rate: "ब्याज दर",
          tenure: "अवधि",
          monthly_emi: "मासिक किस्त (EMI)",
          total_interest: "कुल ब्याज",
          total_payment: "कुल भुगतान"
        },
        "image-compressor": {
          name: "छवि कंप्रेसर",
          desc: "गुणवत्ता के साथ छवि कंप्रेस करें।",
          compress: "अभी कंप्रेस करें",
          compressing: "कंप्रेस हो रहा है...",
          you_saved: "आपने बचाया",
          space: "स्पेस!"
        },
        "word-counter": {
          name: "शब्द काउंटर",
          desc: "वास्तविक समय टेक्स्ट विश्लेषण।",
          stats: {
            words: "शब्द",
            chars: "अक्षर",
            chars_no_space: "अक्षर (बिना स्पेस)",
            sentences: "वाक्य",
            paragraphs: "पैराग्राफ",
            reading_time: "पढ़ने का समय"
          },
          placeholder: "यहाँ टेक्स्ट टाइप करें या पेस्ट करें..."
        },
        "currency-converter": {
          name: "मुद्रा परिवर्तक",
          desc: "लाइव विनिमय दर।",
          amount: "राशि",
          from: "से",
          to: "तक"
        },
        "seo-analyzer": {
          name: "SEO विश्लेषक",
          desc: "वेबसाइट के SEO टैग स्कैन करें।",
          analyze: "विश्लेषण करें",
          title: "पेज का शीर्षक",
          description: "मेटा विवरण"
        },
        "password-generator": {
          name: "पासवर्ड जनरेटर",
          desc: "सुरक्षित पासवर्ड बनाएँ।",
          generate: "पासवर्ड बनाएँ",
          length: "लंबाई",
          uppercase: "बड़े अक्षर",
          lowercase: "छोटे अक्षर",
          numbers: "नंबर",
          symbols: "प्रतीक"
        },
        "json-formatter": {
          name: "JSON फ़ॉर्मेटर",
          desc: "JSON को सुंदर बनाएँ और मान्य करें",
          beautify: "JSON फ़ॉर्मेट करें",
          invalid: "अमान्य JSON"
        },
        "age-calculator": {
          name: "आयु कैलकुलेटर",
          desc: "अपनी सही आयु जानें।",
          dob: "जन्म तिथि",
          age_is: "आपकी सही आयु है",
          years: "साल",
          months: "महीने",
          days: "दिन"
        },
        "bmi-calculator": {
          name: "BMI कैलकुलेटर",
          desc: "अपना बॉडी मास इंडेक्स जाँचें।",
          weight: "वजन",
          height: "ऊंचाई",
          underweight: "कम वजन",
          normal: "सामान्य",
          overweight: "अधिक वजन",
          obese: "मोटापा"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
