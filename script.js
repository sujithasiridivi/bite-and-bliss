/* ============================================================
   BITE & BLISS — script.js
   Single shared script for all pages.
   Pure recipe site — no cart, no ordering.
   63 recipes (Peking Duck & Lamb Kofta removed).
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   1. SEED DATA — 63 Recipes across 10 cuisines
   ───────────────────────────────────────────── */
const DEFAULT_RECIPES = [
  // ── INDIAN (10) ──────────────────────────────────────────────────────────
  {
    id: 1, title: 'Royal Butter Chicken', category: 'Indian',
    time: '45 mins', difficulty: 'Medium', calories: 520, protein: '34g', fat: '28g', carbs: '22g',
    rating: 4.9, image: 'images/butterchicken.jpg',
    desc: 'Tender chicken simmered in a velvety saffron-laced tomato butter sauce, slow-cooked to imperial perfection.',
    ingredients: ['600g boneless chicken thighs', '4 ripe vine tomatoes', '3 tbsp churned butter', 'Pinch saffron threads', '200ml heavy cream', '1 tbsp garam masala', '1 tsp kashmiri chilli'],
    steps: ['Marinate chicken in yoghurt and spices for 2 hours.', 'Char tomatoes and blend into a smooth purée.', 'Fry spices in butter until fragrant.', 'Add tomato purée and simmer 20 mins.', 'Fold in cream and chicken, simmer 15 mins.', 'Finish with kasuri methi and butter.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 2, title: 'Hyderabadi Dum Biryani', category: 'Indian',
    time: '90 mins', difficulty: 'Hard', calories: 680, protein: '38g', fat: '26g', carbs: '72g',
    rating: 4.9, image: 'images/hyderabadibiryani.jpg',
    desc: 'Fragrant aged basmati layered with slow-braised spiced mutton and sealed with atta dough for royal dum cooking.',
    ingredients: ['500g aged basmati rice', '700g mutton shoulder', 'Pinch saffron in warm milk', '4 brown onions, fried crisp', '2 tbsp biryani masala', 'Mint and coriander leaves', 'Rose water'],
    steps: ['Marinate mutton with yoghurt and spices overnight.', 'Par-boil rice with whole spices until 70% done.', 'Layer rice over cooked mutton.', 'Sprinkle saffron milk and fried onions.', 'Seal pot with dough and cook on dum 30 mins.', 'Rest 10 mins before opening.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 3, title: 'Palak Paneer', category: 'Indian',
    time: '35 mins', difficulty: 'Easy', calories: 380, protein: '22g', fat: '24g', carbs: '18g',
    rating: 4.7, image: 'images/palakpaneer.jpg',
    desc: 'Silky blanched spinach purée enveloping golden-seared artisanal paneer cubes in a spiced cream sauce.',
    ingredients: ['300g fresh paneer', '400g baby spinach', '2 tbsp ghee', '1 onion, finely diced', '1 tsp cumin seeds', '1 tbsp ginger-garlic paste', '100ml cream'],
    steps: ['Blanch spinach and blend smooth.', 'Sear paneer in ghee until golden.', 'Sauté onion and spices in ghee.', 'Add spinach purée and simmer 8 mins.', 'Fold in cream and paneer.', 'Season and serve with naan.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 4, title: 'Dal Makhani', category: 'Indian',
    time: '180 mins', difficulty: 'Medium', calories: 420, protein: '18g', fat: '20g', carbs: '48g',
    rating: 4.8, image: 'images/dalmakhani.jpg',
    desc: 'Black lentils slow-simmered overnight with tomatoes, butter, and cream into a deeply luxurious velvety curry.',
    ingredients: ['250g whole black lentils', '50g kidney beans', '4 tbsp butter', '200ml cream', '2 tomatoes, puréed', '1 tbsp ginger-garlic paste', 'Kashmiri chilli powder'],
    steps: ['Soak lentils overnight and pressure cook until soft.', 'Sauté ginger-garlic and tomato purée.', 'Add cooked lentils and simmer 1 hour.', 'Stir in butter every 20 mins.', 'Finish with cream and simmer 30 more mins.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 5, title: 'Chole Bhature', category: 'Indian',
    time: '50 mins', difficulty: 'Medium', calories: 560, protein: '20g', fat: '22g', carbs: '68g',
    rating: 4.6, image: 'images/cholebhature.jpg',
    desc: 'Tangy spiced chickpea masala paired with puffy deep-fried bhature, a street food classic elevated to royal status.',
    ingredients: ['400g chickpeas, soaked overnight', '2 onions, puréed', '3 tomatoes, puréed', '1 tbsp chole masala', '2 cups all-purpose flour', '1 cup yoghurt', 'Oil for frying'],
    steps: ['Pressure cook chickpeas until tender.', 'Sauté onion purée until golden.', 'Add tomato purée and chole masala.', 'Simmer chickpeas in gravy 20 mins.', 'Make bhature dough with flour, yoghurt.', 'Roll and deep fry until puffed and golden.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 6, title: 'Rogan Josh', category: 'Indian',
    time: '75 mins', difficulty: 'Hard', calories: 590, protein: '42g', fat: '32g', carbs: '14g',
    rating: 4.8, image: 'images/roganjosh.jpg',
    desc: 'Kashmiri lamb braised in a fiery crimson gravy perfumed with whole spices and dried red chillies.',
    ingredients: ['700g lamb shoulder', '6 dried Kashmiri chillies', 'Whole spices (cardamom, clove, cinnamon)', '4 tbsp mustard oil', '200g yoghurt', '1 tsp fennel powder', 'Saffron pinch'],
    steps: ['Heat mustard oil until smoking, add whole spices.', 'Brown lamb on all sides.', 'Add soaked chillies and yoghurt.', 'Cover and slow cook 60 mins.', 'Finish with saffron and fennel.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 7, title: 'Gulab Jamun', category: 'Indian',
    time: '40 mins', difficulty: 'Medium', calories: 310, protein: '6g', fat: '12g', carbs: '48g',
    rating: 4.9, image: 'images/gulabjamun.jpg',
    desc: 'Soft milk-solid dumplings fried to perfection and soaked in cardamom-rose water sugar syrup.',
    ingredients: ['200g khoya', '3 tbsp all-purpose flour', 'Pinch baking soda', 'Oil for frying', '300g sugar', '1 cup water', 'Cardamom pods', 'Rose water'],
    steps: ['Knead khoya, flour, and baking soda into dough.', 'Shape into smooth balls.', 'Deep fry on low heat until dark golden.', 'Make sugar syrup with cardamom and rose water.', 'Soak fried balls in warm syrup for 2 hours.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 8, title: 'Tandoori Chicken', category: 'Indian',
    time: '60 mins', difficulty: 'Medium', calories: 440, protein: '48g', fat: '18g', carbs: '8g',
    rating: 4.7, image: 'images/tandoorichicken.jpg',
    desc: 'Charred chicken legs marinated in yoghurt and spice paste, cooked at fierce heat for a smoky finish.',
    ingredients: ['1kg chicken legs, scored', '200g thick yoghurt', '2 tbsp tandoori masala', '1 tbsp ginger-garlic paste', 'Lemon juice', 'Red food colour (optional)', 'Oil'],
    steps: ['Score chicken and marinate 6 hours in spiced yoghurt.', 'Preheat oven to 230°C or prepare grill.', 'Cook chicken 25 mins turning once.', 'Char under broiler 3-4 mins.', 'Serve with mint chutney and sliced onions.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 9, title: 'Samosa', category: 'Indian',
    time: '50 mins', difficulty: 'Medium', calories: 280, protein: '7g', fat: '14g', carbs: '34g',
    rating: 4.6, image: 'images/samosa.jpg',
    desc: 'Crispy golden pastry filled with spiced potato and peas, served with vibrant tamarind and mint chutneys.',
    ingredients: ['2 cups all-purpose flour', '400g potatoes, boiled', '100g peas', '1 tsp cumin seeds', '1 tbsp ginger, grated', 'Garam masala', 'Oil for frying'],
    steps: ['Make stiff dough with flour and oil.', 'Sauté cumin, ginger, potatoes, and peas with spices.', 'Rest filling to cool completely.', 'Roll dough thin and cut into circles.', 'Fill and seal into cone shapes.', 'Deep fry until golden and crisp.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 10, title: 'Kheer', category: 'Indian',
    time: '55 mins', difficulty: 'Easy', calories: 290, protein: '8g', fat: '10g', carbs: '44g',
    rating: 4.5, image: 'images/kheer.jpg',
    desc: 'Slow-cooked creamy rice pudding scented with cardamom, saffron, and crowned with pistachios and silver leaf.',
    ingredients: ['1 litre full-fat milk', '60g basmati rice', '80g sugar', '6 cardamom pods', 'Pinch saffron', 'Pistachios and almonds', 'Rose water'],
    steps: ['Bring milk to boil and add washed rice.', 'Simmer stirring constantly for 35 mins.', 'Add sugar, cardamom, and saffron.', 'Cook until thick and creamy.', 'Chill and garnish before serving.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },

  // ── ITALIAN (7) ──────────────────────────────────────────────────────────
  {
    id: 11, title: 'Artisanal Margherita Pizza', category: 'Italian',
    time: '90 mins', difficulty: 'Hard', calories: 650, protein: '26g', fat: '22g', carbs: '88g',
    rating: 4.9, image: 'images/artisanalmargheritapizza.jpg',
    desc: 'Slow-fermented sourdough crust topped with San Marzano tomatoes, buffalo mozzarella, and fresh basil.',
    ingredients: ['500g 00 flour', '350ml cold water', '10g sea salt', '3g dry yeast', 'San Marzano tomatoes', 'Buffalo mozzarella', 'Fresh basil leaves', 'Extra virgin olive oil'],
    steps: ['Mix flour, water, salt, yeast into dough.', 'Ferment 24 hours in fridge.', 'Shape into balls, rest 2 hours.', 'Stretch dough by hand.', 'Top with crushed tomatoes and mozzarella.', 'Bake at 280°C for 6-8 mins.', 'Finish with basil and olive oil.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 12, title: 'Spaghetti Carbonara', category: 'Italian',
    time: '25 mins', difficulty: 'Medium', calories: 580, protein: '28g', fat: '24g', carbs: '62g',
    rating: 4.8, image: 'images/spaghetti_carbonara.jpg',
    desc: 'Authentic Roman carbonara — guanciale, Pecorino Romano, and silky egg yolks create a luxurious coating.',
    ingredients: ['400g spaghetti', '150g guanciale', '4 egg yolks', '100g Pecorino Romano', 'Freshly cracked black pepper', 'Sea salt'],
    steps: ['Cook spaghetti in well-salted water.', 'Render guanciale in dry pan until crisp.', 'Whisk yolks with grated Pecorino.', 'Reserve pasta water before draining.', 'Toss hot pasta with guanciale off heat.', 'Add yolk mixture and pasta water to emulsify.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 13, title: 'Osso Buco', category: 'Italian',
    time: '150 mins', difficulty: 'Hard', calories: 720, protein: '52g', fat: '36g', carbs: '18g',
    rating: 4.9, image: 'images/ossabuco.jpg',
    desc: 'Milanese braised veal shanks in white wine and vegetables, crowned with vibrant lemon-parsley gremolata.',
    ingredients: ['4 veal shank slices', '1 cup white wine', '2 carrots', '2 celery stalks', '1 onion', 'Tomato paste', 'Beef stock', 'Gremolata: lemon zest, garlic, parsley'],
    steps: ['Flour and brown veal shanks on all sides.', 'Sauté soffritto in same pan.', 'Deglaze with white wine.', 'Add stock and tomatoes, braise 2 hours.', 'Prepare gremolata while braising.', 'Serve over saffron risotto with gremolata.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 14, title: 'Tiramisu', category: 'Italian',
    time: '30 mins', difficulty: 'Medium', calories: 460, protein: '10g', fat: '28g', carbs: '42g',
    rating: 4.9, image: 'images/tiramisu.jpg',
    desc: 'Espresso-soaked ladyfingers layered with mascarpone cream, dusted in Belgian dark cocoa.',
    ingredients: ['300g mascarpone', '4 egg yolks', '80g sugar', '200ml strong espresso', '30 savoiardi biscuits', 'Dark cocoa powder', '50ml Marsala wine'],
    steps: ['Whip yolks and sugar until pale and thick.', 'Fold in mascarpone until smooth.', 'Dip ladyfingers briefly in cool espresso.', 'Layer biscuits then cream in dish.', 'Repeat layers and refrigerate overnight.', 'Dust generously with cocoa before serving.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 15, title: 'Risotto ai Funghi', category: 'Italian',
    time: '40 mins', difficulty: 'Medium', calories: 520, protein: '14g', fat: '22g', carbs: '64g',
    rating: 4.7, image: 'images/risottoaifunghi.jpg',
    desc: 'Creamy Arborio rice stirred to perfection with wild porcini mushrooms, white wine, and aged Parmigiano.',
    ingredients: ['300g Arborio rice', '200g mixed wild mushrooms', '1 litre warm vegetable stock', '1 cup white wine', '1 shallot', '50g Parmigiano Reggiano', '3 tbsp butter'],
    steps: ['Sauté shallot and mushrooms in butter.', 'Add rice and toast 2 mins.', 'Deglaze with wine and stir until absorbed.', 'Add warm stock ladle by ladle stirring constantly.', 'Remove from heat and stir in butter and Parmigiano.', 'Rest 2 mins before serving.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 16, title: 'Penne all\'Arrabbiata', category: 'Italian',
    time: '20 mins', difficulty: 'Easy', calories: 480, protein: '16g', fat: '14g', carbs: '72g',
    rating: 4.5, image: 'images/penneallarrabbiata.jpg',
    desc: 'Fiery Roman pasta tossed in a bold tomato sauce with garlic and dried chilli flakes.',
    ingredients: ['400g penne rigate', '400g San Marzano tomatoes', '4 garlic cloves', '2 dried chillies', 'Extra virgin olive oil', 'Fresh parsley', 'Sea salt'],
    steps: ['Sauté crushed garlic and chillies in olive oil.', 'Add tomatoes and crush.', 'Simmer sauce 15 mins.', 'Cook pasta al dente.', 'Toss pasta in sauce with pasta water.', 'Finish with parsley.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 17, title: 'Panna Cotta', category: 'Italian',
    time: '20 mins', difficulty: 'Easy', calories: 340, protein: '6g', fat: '22g', carbs: '30g',
    rating: 4.8, image: 'images/pannacotta.jpg',
    desc: 'Silky chilled cream dessert scented with vanilla bean and served with a coulis of wild summer berries.',
    ingredients: ['500ml heavy cream', '50g sugar', '1 vanilla bean', '2.5 tsp gelatin', '3 tbsp cold water', 'Berry coulis'],
    steps: ['Bloom gelatin in cold water.', 'Heat cream, sugar, and vanilla until near simmer.', 'Remove from heat and stir in gelatin.', 'Pour into moulds and refrigerate 4 hours.', 'Unmould onto plates and spoon coulis over.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },

  // ── CHINESE (6) ──────────────────────────────────────────────────────────
  {
    id: 18, title: 'Tonkotsu Ramen', category: 'Chinese',
    time: '240 mins', difficulty: 'Hard', calories: 780, protein: '44g', fat: '38g', carbs: '68g',
    rating: 4.9, image: 'images/tonkotsuramen.jpg',
    desc: 'Rich pork bone broth simmered 8 hours, layered with chashu, soft-boiled marinated egg, and springy noodles.',
    ingredients: ['1kg pork trotters', 'Ramen noodles', '4 marinated eggs', 'Chashu pork belly slices', 'Nori sheets', 'Spring onions', 'Sesame oil', 'Soy tare'],
    steps: ['Blanch and roast pork bones.', 'Simmer in water 8 hours until cloudy white.', 'Prepare chashu pork belly.', 'Soft-boil eggs and marinate in soy.', 'Assemble bowls with tare, broth, noodles.', 'Top with all garnishes and sesame oil.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 19, title: 'Kung Pao Chicken', category: 'Chinese',
    time: '25 mins', difficulty: 'Medium', calories: 480, protein: '36g', fat: '22g', carbs: '28g',
    rating: 4.7, image: 'images/kungpaochicken.jpg',
    desc: 'Sichuan stir-fry of tender chicken, dried chillies, roasted peanuts, and bold Sichuan peppercorns.',
    ingredients: ['500g chicken breast, diced', '50g roasted peanuts', '8 dried Sichuan chillies', '1 tsp Sichuan peppercorn', '3 garlic cloves', '1 tbsp soy sauce', '1 tbsp rice vinegar', 'Sesame oil'],
    steps: ['Marinate chicken in soy, cornstarch.', 'Toast peppercorns and chillies in wok.', 'High-heat stir-fry chicken.', 'Add garlic and sauce ingredients.', 'Toss in peanuts and spring onions.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 20, title: 'Dim Sum Basket', category: 'Chinese',
    time: '60 mins', difficulty: 'Hard', calories: 420, protein: '22g', fat: '16g', carbs: '48g',
    rating: 4.8, image: 'images/dimsumbasket.jpg',
    desc: 'Delicate steamed parcels of shrimp har gow and pork siu mai, served with ginger-soy dipping sauce.',
    ingredients: ['200g shrimp, peeled', '150g pork mince', 'Har gow wrappers', 'Siu mai wrappers', '1 tbsp oyster sauce', 'Sesame oil', 'Ginger, diced', 'Spring onions'],
    steps: ['Prepare shrimp filling with sesame oil and ginger.', 'Prepare pork filling with oyster sauce.', 'Wrap har gow with pleated folds.', 'Shape siu mai in open-top style.', 'Steam on parchment-lined bamboo for 8 mins.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 21, title: 'Mapo Tofu', category: 'Chinese',
    time: '20 mins', difficulty: 'Easy', calories: 360, protein: '18g', fat: '20g', carbs: '22g',
    rating: 4.6, image: 'images/mapotofu.jpg',
    desc: 'Silken tofu in a fiery, numbing Sichuan chilli bean sauce with ground pork and Sichuan peppercorns.',
    ingredients: ['400g silken tofu', '150g ground pork', '2 tbsp doubanjiang', '1 tsp Sichuan peppercorn', 'Garlic and ginger', 'Chicken stock', 'Cornstarch slurry'],
    steps: ['Stir-fry pork until browned.', 'Add doubanjiang, garlic, ginger.', 'Pour in stock and bring to simmer.', 'Gently add tofu cubes.', 'Thicken with cornstarch slurry.', 'Finish with Sichuan oil and spring onion.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 23, title: 'Xiaolongbao', category: 'Chinese',
    time: '90 mins', difficulty: 'Hard', calories: 380, protein: '20g', fat: '16g', carbs: '42g',
    rating: 4.8, image: 'images/xiaolongbao.jpg',
    desc: 'Shanghai soup dumplings filled with pork and molten jellied pork broth, pleated with 16 delicate folds.',
    ingredients: ['300g pork mince', '200ml pork aspic', 'Thin wrapper dough', 'Soy sauce', 'Sesame oil', 'Ginger', 'Black vinegar for dipping'],
    steps: ['Make pork aspic and chill until firm.', 'Mix pork with aspic pieces and seasonings.', 'Roll wrappers very thin.', 'Fill and pleat 16 folds per dumpling.', 'Steam 8 mins on parchment.', 'Serve immediately with black vinegar.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 24, title: 'Char Siu', category: 'Chinese',
    time: '50 mins', difficulty: 'Medium', calories: 540, protein: '38g', fat: '28g', carbs: '24g',
    rating: 4.7, image: 'images/charsiu.jpg',
    desc: 'Cantonese honey-glazed BBQ pork with a lacquered red exterior and tender, juicy interior.',
    ingredients: ['600g pork shoulder', '3 tbsp hoisin sauce', '2 tbsp honey', '2 tbsp soy sauce', '1 tbsp oyster sauce', 'Five spice', 'Red fermented tofu'],
    steps: ['Combine all marinade ingredients.', 'Marinate pork 24 hours.', 'Roast at 200°C for 25 mins.', 'Baste with honey glaze.', 'Roast 10 more mins until lacquered.', 'Slice and serve over steamed rice.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },

  // ── DESSERT (8) ──────────────────────────────────────────────────────────
  {
    id: 25, title: 'Chocolate Lava Cake', category: 'Dessert',
    time: '25 mins', difficulty: 'Medium', calories: 480, protein: '8g', fat: '30g', carbs: '50g',
    rating: 4.9, image: 'images/chocolatelavacake.jpg',
    desc: 'Warm Belgian dark chocolate cake with a flowing molten centre, dusted with gold and served with vanilla ice cream.',
    ingredients: ['200g 70% dark chocolate', '150g butter', '4 eggs + 4 yolks', '100g caster sugar', '60g flour', 'Pinch sea salt', 'Vanilla ice cream'],
    steps: ['Melt chocolate and butter together.', 'Whip eggs, yolks, and sugar until thick.', 'Fold chocolate into egg mixture.', 'Sift in flour and salt.', 'Butter and flour ramekins.', 'Fill 3/4 and refrigerate.', 'Bake at 200°C for exactly 12 mins.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 26, title: 'Crème Brûlée', category: 'Dessert',
    time: '70 mins', difficulty: 'Medium', calories: 420, protein: '7g', fat: '30g', carbs: '32g',
    rating: 4.9, image: 'images/cremebrulee.jpg',
    desc: 'Classic Parisian custard perfumed with Madagascan vanilla and crowned with a crackling caramel glass.',
    ingredients: ['500ml heavy cream', '6 egg yolks', '100g caster sugar', '1 vanilla bean', 'Extra sugar for brûlée'],
    steps: ['Infuse cream with split vanilla bean.', 'Whisk yolks and sugar until pale.', 'Temper cream into yolks slowly.', 'Strain into ramekins.', 'Bain-marie bake at 160°C 40 mins.', 'Chill overnight and brûlée with torch.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 27, title: 'Baklava', category: 'Dessert',
    time: '90 mins', difficulty: 'Medium', calories: 380, protein: '6g', fat: '22g', carbs: '44g',
    rating: 4.7, image: 'images/baklava.jpg',
    desc: 'Crispy layers of phyllo pastry filled with crushed pistachios and walnuts, drenched in honey-rose syrup.',
    ingredients: ['500g phyllo pastry', '300g mixed pistachios and walnuts', '200g butter, melted', '200g honey', '1 cup water', '1 cup sugar', 'Rose water', 'Cinnamon'],
    steps: ['Brush phyllo layers with melted butter.', 'Layer over nut mixture every 6 sheets.', 'Cut into diamond shapes before baking.', 'Bake at 175°C for 35 mins until golden.', 'Pour cold syrup over hot baklava.', 'Rest 4 hours before serving.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 28, title: 'Profiteroles', category: 'Dessert',
    time: '60 mins', difficulty: 'Hard', calories: 440, protein: '9g', fat: '26g', carbs: '46g',
    rating: 4.8, image: 'images/profiteroles.jpg',
    desc: 'Light choux pastry puffs filled with vanilla Chantilly cream and draped in warm dark chocolate ganache.',
    ingredients: ['125ml water', '55g butter', '70g flour', '2 eggs', '300ml cream', 'Vanilla bean', '150g dark chocolate', '100ml cream for ganache'],
    steps: ['Boil water and butter, add flour, stir vigorously.', 'Beat in eggs one at a time.', 'Pipe small rounds on tray.', 'Bake at 200°C for 25 mins.', 'Cool and fill with whipped cream.', 'Dip or pour chocolate ganache over.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 29, title: 'Mango Kulfi', category: 'Dessert',
    time: '300 mins', difficulty: 'Easy', calories: 260, protein: '5g', fat: '12g', carbs: '34g',
    rating: 4.6, image: 'images/mangokulfi.jpg',
    desc: 'Dense, creamy Indian ice cream churned with Alphonso mango purée and saffron, set in traditional matka moulds.',
    ingredients: ['500ml full-fat milk', '200ml condensed milk', '2 Alphonso mangoes, puréed', 'Pinch saffron', 'Cardamom powder', 'Pistachios'],
    steps: ['Reduce milk to half by simmering.', 'Mix in condensed milk and mango purée.', 'Add saffron, cardamom.', 'Pour into kulfi moulds.', 'Freeze 5 hours.', 'Unmould and garnish with pistachios.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 30, title: 'Soufflé au Chocolat', category: 'Dessert',
    time: '35 mins', difficulty: 'Hard', calories: 390, protein: '10g', fat: '22g', carbs: '40g',
    rating: 4.8, image: 'images/souffleauchocolat.jpg',
    desc: 'Light-as-air French chocolate soufflé that rises magnificently, served instantly with crème anglaise.',
    ingredients: ['150g 70% dark chocolate', '4 egg yolks', '5 egg whites', '80g caster sugar', '30g butter', 'Cocoa powder', 'Crème anglaise'],
    steps: ['Butter and cocoa ramekins precisely.', 'Melt chocolate and mix with yolks.', 'Whip whites with sugar to stiff peaks.', 'Fold whites into chocolate base in 3 batches.', 'Fill ramekins to rim.', 'Bake at 190°C for exactly 13 mins.', 'Serve within 2 minutes.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 31, title: 'Pavlova', category: 'Dessert',
    time: '120 mins', difficulty: 'Medium', calories: 310, protein: '5g', fat: '16g', carbs: '40g',
    rating: 4.7, image: 'images/pavlova.jpg',
    desc: 'Crisp meringue shell with a pillowy marshmallow centre, crowned with whipped cream and passion fruit.',
    ingredients: ['5 egg whites', '300g caster sugar', '1 tsp white vinegar', '2 tsp cornstarch', '400ml cream', 'Passion fruit', 'Kiwi and berries'],
    steps: ['Whip egg whites to stiff peaks.', 'Gradually add sugar until glossy.', 'Fold in vinegar and cornstarch.', 'Shape into a nest on baking paper.', 'Bake at 120°C for 90 mins.', 'Cool in oven with door ajar.', 'Top with cream and fruit.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 32, title: 'Churros con Chocolate', category: 'Dessert',
    time: '30 mins', difficulty: 'Easy', calories: 420, protein: '8g', fat: '20g', carbs: '56g',
    rating: 4.7, image: 'images/churrosconchocolate.jpg',
    desc: 'Crispy cinnamon-sugar dusted Spanish churros served with a thick, velvety dark chocolate dipping sauce.',
    ingredients: ['250ml water', '200g flour', '1 tsp salt', '1 tbsp sugar', 'Oil for frying', '100g dark chocolate', '150ml cream', 'Cinnamon and sugar mix'],
    steps: ['Boil water with salt and sugar.', 'Beat in flour to form dough.', 'Pipe star-shaped strips into hot oil.', 'Fry until golden, about 2 mins.', 'Dust immediately with cinnamon sugar.', 'Melt chocolate with cream for dipping sauce.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },

  // ── SNACKS (8) ───────────────────────────────────────────────────────────
  {
    id: 33, title: 'Avocado Toast', category: 'Snacks',
    time: '10 mins', difficulty: 'Easy', calories: 320, protein: '8g', fat: '22g', carbs: '26g',
    rating: 4.5, image: 'images/avocadotoast.jpg',
    desc: 'Toasted sourdough crowned with smashed ripe avocado, sea salt flakes, chilli, and a poached egg.',
    ingredients: ['2 slices sourdough', '1 ripe avocado', '2 eggs', 'Chilli flakes', 'Lemon juice', 'Sea salt flakes', 'Microgreens'],
    steps: ['Toast sourdough until golden.', 'Smash avocado with lemon, salt, chilli.', 'Poach eggs in swirling water.', 'Spread avocado on toast.', 'Top with poached egg and garnishes.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 34, title: 'Bruschetta Classica', category: 'Snacks',
    time: '15 mins', difficulty: 'Easy', calories: 240, protein: '7g', fat: '10g', carbs: '32g',
    rating: 4.5, image: 'images/bruschettaclassica.jpg',
    desc: 'Grilled ciabatta rubbed with garlic and topped with ripe tomatoes, fresh basil, and extra virgin olive oil.',
    ingredients: ['1 ciabatta loaf', '4 ripe tomatoes, diced', '2 garlic cloves', 'Fresh basil', 'Extra virgin olive oil', 'Sea salt', 'Black pepper'],
    steps: ['Grill ciabatta slices.', 'Rub warm bread with garlic clove.', 'Toss tomatoes with basil and olive oil.', 'Season well and pile onto toast.', 'Drizzle generously with oil.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 35, title: 'Nachos Supreme', category: 'Snacks',
    time: '20 mins', difficulty: 'Easy', calories: 560, protein: '18g', fat: '28g', carbs: '60g',
    rating: 4.5, image: 'images/nachossupreme.jpg',
    desc: 'Crispy corn tortilla chips loaded with melted cheddar, jalapeños, sour cream, guacamole, and pico de gallo.',
    ingredients: ['200g tortilla chips', '150g cheddar, grated', 'Jalapeño slices', 'Sour cream', 'Guacamole', 'Pico de gallo', 'Black beans'],
    steps: ['Layer chips on baking tray.', 'Scatter cheese and jalapeños.', 'Bake at 200°C until cheese melts.', 'Top with cold garnishes.', 'Serve immediately.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 36, title: 'Spring Rolls', category: 'Snacks',
    time: '40 mins', difficulty: 'Medium', calories: 310, protein: '10g', fat: '14g', carbs: '38g',
    rating: 4.6, image: 'images/springrolls.jpg',
    desc: 'Crispy golden rolls filled with stir-fried vegetables, glass noodles, and mushrooms with soy dipping sauce.',
    ingredients: ['Spring roll wrappers', '200g cabbage, shredded', '100g glass noodles', 'Shiitake mushrooms', 'Carrots', 'Soy sauce', 'Oil for frying'],
    steps: ['Sauté vegetables and noodles.', 'Season with soy and sesame.', 'Fill and roll wrappers tightly.', 'Seal with cornstarch paste.', 'Deep fry until golden and crisp.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 37, title: 'Garlic Bread', category: 'Snacks',
    time: '15 mins', difficulty: 'Easy', calories: 280, protein: '6g', fat: '14g', carbs: '34g',
    rating: 4.4, image: 'images/garlicbread.jpg',
    desc: 'Crusty baguette slathered with herb butter and toasted until golden — the perfect companion to any dish.',
    ingredients: ['1 baguette', '100g softened butter', '4 garlic cloves, minced', 'Fresh parsley', 'Pinch sea salt', 'Mozzarella (optional)'],
    steps: ['Mix butter with garlic, parsley, salt.', 'Slice baguette without cutting through.', 'Spread butter mixture between slices.', 'Wrap in foil and bake 15 mins.', 'Open foil and broil 3 mins.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 38, title: 'Caprese Skewers', category: 'Snacks',
    time: '10 mins', difficulty: 'Easy', calories: 220, protein: '12g', fat: '16g', carbs: '6g',
    rating: 4.5, image: 'images/capreseskewers.jpg',
    desc: 'Miniature mozzarella pearls, cherry tomatoes, and fresh basil threaded on skewers with balsamic glaze.',
    ingredients: ['200g mozzarella pearls', '200g cherry tomatoes', 'Fresh basil leaves', 'Balsamic glaze', 'Extra virgin olive oil', 'Sea salt', 'Black pepper'],
    steps: ['Thread tomato, basil, mozzarella onto skewers.', 'Arrange on platter.', 'Drizzle with olive oil and balsamic.', 'Season and serve immediately.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 39, title: 'Pani Puri', category: 'Snacks',
    time: '30 mins', difficulty: 'Medium', calories: 240, protein: '6g', fat: '6g', carbs: '42g',
    rating: 4.8, image: 'images/panipuri.jpg',
    desc: 'Hollow crispy puris filled with tangy tamarind water, spiced potato, and sprouted lentils.',
    ingredients: ['200g semolina', 'Warm water', 'Oil for frying', '2 potatoes, boiled', 'Tamarind pulp', 'Mint leaves', 'Green chillies', 'Cumin powder'],
    steps: ['Knead semolina with water into stiff dough.', 'Roll thin and cut circles.', 'Deep fry until puffed.', 'Make tangy mint-tamarind water.', 'Fill puris with potato mix and water to serve.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 40, title: 'Falafel Wrap', category: 'Snacks',
    time: '35 mins', difficulty: 'Medium', calories: 390, protein: '16g', fat: '14g', carbs: '52g',
    rating: 4.6, image: 'images/falafelwrap.jpg',
    desc: 'Crispy chickpea falafel wrapped in warm flatbread with hummus, pickled vegetables, and tahini drizzle.',
    ingredients: ['400g dried chickpeas, soaked', 'Onion, garlic, parsley', 'Cumin, coriander', 'Oil for frying', 'Flatbread', 'Hummus', 'Pickled vegetables', 'Tahini sauce'],
    steps: ['Blend soaked chickpeas with herbs and spices.', 'Shape into balls.', 'Deep fry until dark golden.', 'Warm flatbread on griddle.', 'Assemble with hummus, falafel, pickles.', 'Drizzle tahini and serve.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },

  // ── HEALTHY (6) ──────────────────────────────────────────────────────────
  {
    id: 41, title: 'Buddha Bowl', category: 'Healthy',
    time: '25 mins', difficulty: 'Easy', calories: 380, protein: '14g', fat: '16g', carbs: '48g',
    rating: 4.7, image: 'images/buddhabowl.jpg',
    desc: 'Nourishing bowl of roasted sweet potato, brown rice, edamame, avocado, and miso-tahini dressing.',
    ingredients: ['150g brown rice', '1 sweet potato, cubed', '100g edamame', '1 avocado', 'Red cabbage', 'Sesame seeds', '2 tbsp miso', '2 tbsp tahini'],
    steps: ['Cook brown rice.', 'Roast sweet potato with olive oil.', 'Assemble rice base in bowl.', 'Add all toppings around the bowl.', 'Whisk miso-tahini dressing and drizzle.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 42, title: 'Greek Salad', category: 'Healthy',
    time: '10 mins', difficulty: 'Easy', calories: 220, protein: '9g', fat: '16g', carbs: '12g',
    rating: 4.4, image: 'images/greeksalad.jpg',
    desc: 'Crisp cucumber, ripe tomatoes, Kalamata olives, and creamy feta in a lemon-herb vinaigrette.',
    ingredients: ['2 cucumbers', '400g cherry tomatoes', '150g feta, crumbled', 'Kalamata olives', '1 red onion', 'Extra virgin olive oil', 'Dried oregano', 'Lemon'],
    steps: ['Chop all vegetables into chunky pieces.', 'Combine in large bowl.', 'Add feta and olives.', 'Dress with olive oil, lemon, oregano.', 'Season and serve immediately.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 43, title: 'Quinoa Tabbouleh', category: 'Healthy',
    time: '20 mins', difficulty: 'Easy', calories: 280, protein: '10g', fat: '12g', carbs: '36g',
    rating: 4.5, image: 'images/quinoatabbouleh.jpg',
    desc: 'Protein-packed quinoa tabbouleh with mountains of fresh parsley, mint, tomato, and bright lemon dressing.',
    ingredients: ['200g quinoa', 'Large bunch flat-leaf parsley', 'Mint leaves', '2 tomatoes, diced', '1 cucumber', 'Lemon juice', 'Extra virgin olive oil', 'Sea salt'],
    steps: ['Cook and cool quinoa.', 'Chop parsley and mint finely.', 'Dice tomatoes and cucumber.', 'Combine all ingredients.', 'Dress generously with lemon and olive oil.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 44, title: 'Smoothie Bowl', category: 'Healthy',
    time: '10 mins', difficulty: 'Easy', calories: 310, protein: '8g', fat: '6g', carbs: '58g',
    rating: 4.6, image: 'images/smoothiebowl.jpg',
    desc: 'Thick blended açaí and berry smoothie served in a bowl, topped with granola, fresh fruit, and honey.',
    ingredients: ['100g frozen açaí', '200g frozen mixed berries', '1 banana', '100ml almond milk', 'Granola', 'Fresh strawberries', 'Chia seeds', 'Honey'],
    steps: ['Blend frozen açaí, berries, banana with almond milk.', 'Blend until thick but not too smooth.', 'Pour into bowl.', 'Top artfully with all garnishes.', 'Drizzle honey and serve immediately.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 45, title: 'Baked Salmon Teriyaki', category: 'Healthy',
    time: '25 mins', difficulty: 'Easy', calories: 420, protein: '42g', fat: '18g', carbs: '16g',
    rating: 4.8, image: 'images/bakedsalmonteriyaki.jpg',
    desc: 'Glazed salmon fillets baked with a sweet-savory teriyaki sauce and served on steamed jasmine rice.',
    ingredients: ['4 salmon fillets', '3 tbsp soy sauce', '2 tbsp honey', '1 tbsp mirin', '1 tbsp sake', 'Sesame seeds', 'Spring onions', 'Jasmine rice'],
    steps: ['Combine soy, honey, mirin, sake for glaze.', 'Marinate salmon 30 mins.', 'Bake at 200°C for 15 mins.', 'Brush with extra glaze midway.', 'Serve over rice with sesame and spring onion.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 46, title: 'Vegetable Soup', category: 'Healthy',
    time: '35 mins', difficulty: 'Easy', calories: 180, protein: '6g', fat: '5g', carbs: '28g',
    rating: 4.4, image: 'images/vegetablesoup.jpg',
    desc: 'Nourishing minestrone with seasonal vegetables, white beans, fresh herbs, and a drizzle of grassy olive oil.',
    ingredients: ['2 carrots', '3 celery stalks', '1 onion', '400g canned tomatoes', '400g white beans', 'Vegetable stock', 'Rosemary and thyme', 'Olive oil'],
    steps: ['Sauté onion, carrot, celery in olive oil.', 'Add tomatoes and stock.', 'Simmer 20 mins.', 'Add beans and herbs.', 'Cook 10 more mins and adjust seasoning.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },

  // ── BEVERAGES (6) ────────────────────────────────────────────────────────
  {
    id: 47, title: 'Masala Chai', category: 'Beverages',
    time: '15 mins', difficulty: 'Easy', calories: 120, protein: '3g', fat: '4g', carbs: '18g',
    rating: 4.8, image: 'images/masalachai.jpg',
    desc: 'Spiced Indian milk tea brewed with cardamom, ginger, cinnamon, and black pepper — warming and aromatic.',
    ingredients: ['400ml whole milk', '200ml water', '3 tsp Assam tea leaves', '4 green cardamom pods', '1 inch ginger, sliced', '1 cinnamon stick', '4 black peppercorns', 'Sugar to taste'],
    steps: ['Crack cardamom and crush ginger.', 'Boil water with all spices 5 mins.', 'Add tea leaves and steep 2 mins.', 'Add milk and bring to boil.', 'Simmer and strain into cups.', 'Sweeten to taste.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 48, title: 'Mango Lassi', category: 'Beverages',
    time: '5 mins', difficulty: 'Easy', calories: 220, protein: '6g', fat: '4g', carbs: '40g',
    rating: 4.7, image: 'images/mangolassi.jpg',
    desc: 'Silky blended Alphonso mango, thick yoghurt, and saffron — a cooling royal refreshment.',
    ingredients: ['2 ripe Alphonso mangoes, puréed', '300g thick yoghurt', '200ml chilled milk', '2 tbsp sugar', 'Pinch cardamom', 'Pinch saffron', 'Ice cubes'],
    steps: ['Blend all ingredients until smooth.', 'Taste and adjust sweetness.', 'Pour over ice.', 'Garnish with saffron strand and pistachio.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 49, title: 'Cold Brew Coffee', category: 'Beverages',
    time: '720 mins', difficulty: 'Easy', calories: 15, protein: '0g', fat: '0g', carbs: '3g',
    rating: 4.7, image: 'images/coldbrewcoffee.jpg',
    desc: 'Coarsely ground single-origin beans steeped 12 hours in cold water for a smooth, chocolatey concentrate.',
    ingredients: ['100g coarsely ground coffee', '1 litre cold filtered water', 'Ice cubes', 'Milk or cream (optional)', 'Sweetener (optional)'],
    steps: ['Combine coffee and cold water.', 'Stir gently and cover.', 'Refrigerate 12-18 hours.', 'Strain through fine mesh and cheesecloth.', 'Serve over ice, dilute 1:1 with water.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 50, title: 'Rose Lemonade', category: 'Beverages',
    time: '10 mins', difficulty: 'Easy', calories: 90, protein: '0g', fat: '0g', carbs: '22g',
    rating: 4.5, image: 'images/roselemonade.jpg',
    desc: 'Fresh squeezed lemon juice sweetened with rose syrup, sparkling water, and dried rose petals.',
    ingredients: ['6 lemons, juiced', '4 tbsp rose syrup', '500ml sparkling water', 'Ice cubes', 'Dried rose petals', 'Fresh mint', 'Sliced lemon'],
    steps: ['Squeeze lemons into pitcher.', 'Add rose syrup and stir.', 'Pour in sparkling water gently.', 'Fill glasses with ice.', 'Pour and garnish with petals and mint.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 51, title: 'Matcha Latte', category: 'Beverages',
    time: '5 mins', difficulty: 'Easy', calories: 110, protein: '4g', fat: '4g', carbs: '14g',
    rating: 4.6, image: 'images/matchalatte.jpg',
    desc: 'Ceremonial grade Japanese matcha whisked to a froth and poured over velvety steamed oat milk.',
    ingredients: ['2 tsp ceremonial matcha', '50ml hot water (75°C)', '250ml oat milk', '1 tsp honey', 'Ice (for iced version)'],
    steps: ['Sift matcha into bowl.', 'Add 75°C water and whisk in a W motion.', 'Steam oat milk until frothy.', 'Pour matcha into glass.', 'Gently pour steamed milk over.', 'Sweeten with honey.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 52, title: 'Virgin Mojito', category: 'Beverages',
    time: '5 mins', difficulty: 'Easy', calories: 80, protein: '0g', fat: '0g', carbs: '20g',
    rating: 4.5, image: 'images/virginmojito.jpg',
    desc: 'Muddled fresh mint and lime juice, sweetened with cane sugar syrup and topped with sparkling soda water.',
    ingredients: ['1 lime, cut in wedges', '10 fresh mint leaves', '2 tbsp cane sugar syrup', 'Sparkling soda water', 'Crushed ice', 'Lime slice to garnish'],
    steps: ['Muddle lime wedges and mint with syrup.', 'Fill glass with crushed ice.', 'Pour muddled mixture over ice.', 'Top with sparkling water.', 'Stir gently and garnish.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },

  // ── MIDDLE EASTERN (4) ───────────────────────────────────────────────────
  {
    id: 53, title: 'Classic Hummus', category: 'Middle Eastern',
    time: '15 mins', difficulty: 'Easy', calories: 280, protein: '10g', fat: '14g', carbs: '28g',
    rating: 4.8, image: 'images/classichummus.jpg',
    desc: 'Silky Levantine hummus of slow-cooked chickpeas, tahini, lemon, and garlic, drizzled with olive oil.',
    ingredients: ['400g cooked chickpeas', '80g quality tahini', '2 garlic cloves', '3 tbsp lemon juice', 'Ice water', 'Extra virgin olive oil', 'Paprika', 'Warm pita'],
    steps: ['Blend chickpeas, tahini, garlic until smooth.', 'Add lemon juice and ice water while blending.', 'Blend 4 minutes for silky texture.', 'Season with salt.', 'Serve with olive oil drizzle and paprika.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 55, title: 'Shakshuka', category: 'Middle Eastern',
    time: '25 mins', difficulty: 'Easy', calories: 320, protein: '18g', fat: '16g', carbs: '22g',
    rating: 4.8, image: 'images/shakshuka.jpg',
    desc: 'Eggs poached in a fragrant tomato-pepper sauce spiced with cumin and paprika — a Middle Eastern classic.',
    ingredients: ['6 eggs', '400g canned tomatoes', '2 red peppers', '1 onion', '3 garlic cloves', '1 tsp cumin', '1 tsp paprika', 'Fresh coriander', 'Feta to crumble'],
    steps: ['Sauté onion, pepper, and garlic.', 'Add tomatoes and spices.', 'Simmer sauce 10 mins.', 'Create wells and crack eggs in.', 'Cover and cook until whites set.', 'Finish with feta and coriander.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 56, title: 'Fattoush Salad', category: 'Middle Eastern',
    time: '15 mins', difficulty: 'Easy', calories: 220, protein: '5g', fat: '12g', carbs: '26g',
    rating: 4.5, image: 'images/fattoushsalad.jpg',
    desc: 'Levantine bread salad of crispy pita, fresh herbs, vegetables, and pomegranate molasses dressing.',
    ingredients: ['2 pita breads, torn and toasted', 'Romaine lettuce', 'Cherry tomatoes', 'Cucumber', 'Radishes', 'Fresh mint and parsley', 'Sumac', 'Pomegranate molasses', 'Olive oil'],
    steps: ['Toast pita pieces until very crisp.', 'Chop all vegetables and herbs.', 'Whisk olive oil, lemon, pomegranate molasses, sumac.', 'Combine everything and toss.', 'Add pita just before serving.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 57, title: 'Mansaf', category: 'Middle Eastern',
    time: '120 mins', difficulty: 'Hard', calories: 820, protein: '60g', fat: '46g', carbs: '54g',
    rating: 4.8, image: 'images/mansaf.jpg',
    desc: 'Jordan\'s royal dish — lamb slow-cooked in tangy fermented yoghurt sauce served over spiced rice with almonds.',
    ingredients: ['1.5kg lamb shoulder pieces', '500g jameed (dried yoghurt)', '400g long-grain rice', 'Pine nuts and almonds, toasted', 'Flatbread', 'Saffron', 'Whole spices'],
    steps: ['Dissolve jameed in water.', 'Brown lamb pieces.', 'Simmer in jameed broth 90 mins.', 'Cook rice with lamb broth and spices.', 'Layer flatbread, rice, and lamb.', 'Pour sauce and garnish with nuts.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },

  // ── MEXICAN (4) ──────────────────────────────────────────────────────────
  {
    id: 58, title: 'Tacos al Pastor', category: 'Mexican',
    time: '40 mins', difficulty: 'Medium', calories: 520, protein: '34g', fat: '22g', carbs: '48g',
    rating: 4.8, image: 'images/tacosalpastor.jpg',
    desc: 'Achiote-marinated pork spit-roasted with pineapple, served in warm corn tortillas with cilantro and onion.',
    ingredients: ['700g pork shoulder, thin sliced', '3 tbsp achiote paste', 'Pineapple chunks', 'Corn tortillas', 'White onion, diced', 'Cilantro leaves', 'Lime wedges', 'Salsa roja'],
    steps: ['Mix achiote with citrus and spices.', 'Marinate pork overnight.', 'Stack and roast pork vertical style.', 'Char pineapple until caramelised.', 'Shave pork and pineapple onto tortillas.', 'Serve with onion, cilantro, salsa.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 59, title: 'Guacamole', category: 'Mexican',
    time: '10 mins', difficulty: 'Easy', calories: 240, protein: '3g', fat: '20g', carbs: '14g',
    rating: 4.8, image: 'images/guacamole.jpg',
    desc: 'Chunky fresh guacamole with ripe Hass avocados, tomato, red onion, jalapeño, cilantro, and lime.',
    ingredients: ['3 ripe Hass avocados', '1 lime', '1 tomato, diced', '1/2 red onion, diced', '1 jalapeño', 'Fresh cilantro', 'Sea salt flakes', 'Tortilla chips'],
    steps: ['Halve avocados and scoop flesh.', 'Mash roughly with fork.', 'Add lime juice immediately.', 'Fold in tomato, onion, jalapeño, cilantro.', 'Season and serve with chips.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 60, title: 'Enchiladas Verdes', category: 'Mexican',
    time: '50 mins', difficulty: 'Medium', calories: 580, protein: '30g', fat: '24g', carbs: '62g',
    rating: 4.6, image: 'images/enchiladasverdes.jpg',
    desc: 'Corn tortillas filled with pulled chicken, drenched in roasted tomatillo salsa verde and melted Oaxacan cheese.',
    ingredients: ['8 corn tortillas', '400g shredded chicken', '500g tomatillos', '2 jalapeños', 'Garlic and onion', 'Oaxacan cheese', 'Sour cream', 'Cilantro'],
    steps: ['Roast tomatillos and jalapeños.', 'Blend into salsa verde.', 'Warm tortillas and fill with chicken.', 'Roll and place in baking dish.', 'Pour salsa verde and add cheese.', 'Bake 20 mins until bubbly.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 61, title: 'Chiles en Nogada', category: 'Mexican',
    time: '120 mins', difficulty: 'Hard', calories: 650, protein: '28g', fat: '34g', carbs: '62g',
    rating: 4.9, image: 'images/chilesennogada.jpg',
    desc: 'Mexico\'s patriotic masterpiece — poblano chiles stuffed with picadillo, walnut cream sauce, pomegranate, and parsley.',
    ingredients: ['6 poblano chiles', '400g pork and beef picadillo', 'Dried fruit and nuts in filling', '300g fresh walnuts', 'Mexican crema', 'Pomegranate seeds', 'Parsley leaves'],
    steps: ['Char poblanos and peel.', 'Cook picadillo with fruit and nuts.', 'Stuff chiles carefully.', 'Blend walnuts with crema for nogada.', 'Pour cold nogada over chiles.', 'Garnish with pomegranate and parsley.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },

  // ── THAI (4) ─────────────────────────────────────────────────────────────
  {
    id: 62, title: 'Pad Thai', category: 'Thai',
    time: '20 mins', difficulty: 'Medium', calories: 520, protein: '28g', fat: '18g', carbs: '62g',
    rating: 4.8, image: 'images/padthai.jpg',
    desc: 'Wok-fried rice noodles with shrimp, egg, bean sprouts, and the perfect balance of tamarind and palm sugar.',
    ingredients: ['200g flat rice noodles', '200g shrimp', '2 eggs', 'Bean sprouts', '3 tbsp tamarind paste', '2 tbsp palm sugar', '2 tbsp fish sauce', 'Roasted peanuts', 'Lime and spring onion'],
    steps: ['Soak noodles in warm water.', 'Stir-fry shrimp in hot wok.', 'Push aside and scramble eggs.', 'Add noodles and sauce.', 'Toss with bean sprouts at the end.', 'Plate and garnish with peanuts, lime.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 63, title: 'Tom Kha Gai', category: 'Thai',
    time: '30 mins', difficulty: 'Easy', calories: 380, protein: '26g', fat: '28g', carbs: '12g',
    rating: 4.7, image: 'images/tomkhagai.jpg',
    desc: 'Thai coconut milk chicken soup with galangal, lemongrass, kaffir lime leaves, and tender mushrooms.',
    ingredients: ['400ml coconut milk', '300ml chicken stock', '300g chicken breast', '100g mushrooms', '3 slices galangal', '2 lemongrass stalks', '4 kaffir lime leaves', 'Fish sauce', 'Lime juice'],
    steps: ['Simmer stock with galangal, lemongrass, lime leaves.', 'Add coconut milk and bring to gentle simmer.', 'Add chicken and mushrooms.', 'Cook until chicken is done.', 'Season with fish sauce and lime juice.', 'Garnish with coriander and chilli.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 64, title: 'Green Curry', category: 'Thai',
    time: '35 mins', difficulty: 'Medium', calories: 460, protein: '28g', fat: '30g', carbs: '24g',
    rating: 4.7, image: 'images/greencurry.jpg',
    desc: 'Aromatic Thai green curry with chicken, bamboo shoots, Thai basil, and rich coconut milk.',
    ingredients: ['3 tbsp green curry paste', '400ml coconut milk', '300g chicken thigh', '100g bamboo shoots', 'Thai basil', '2 kaffir lime leaves', 'Palm sugar', 'Fish sauce'],
    steps: ['Fry curry paste in coconut cream until fragrant.', 'Add chicken and stir to coat.', 'Pour in remaining coconut milk.', 'Add bamboo shoots and lime leaves.', 'Simmer 20 mins.', 'Finish with basil, sugar, fish sauce.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  },
  {
    id: 65, title: 'Mango Sticky Rice', category: 'Thai',
    time: '40 mins', difficulty: 'Easy', calories: 380, protein: '6g', fat: '12g', carbs: '64g',
    rating: 4.9, image: 'images/mangostickyrice.jpg',
    desc: 'Sweet glutinous rice drenched in salted coconut cream, served alongside sliced ripe Champagne mango.',
    ingredients: ['300g glutinous rice', '300ml coconut milk', '4 tbsp palm sugar', '1 tsp salt', '2 ripe mangoes', 'Sesame seeds', 'Mung beans (toasted)'],
    steps: ['Soak glutinous rice 4 hours.', 'Steam until tender, about 25 mins.', 'Heat coconut milk with sugar and salt.', 'Pour 2/3 coconut sauce over hot rice.', 'Rest 15 mins until absorbed.', 'Serve with sliced mango and extra coconut sauce.'],
    comments: [], isCustom: false, author: 'admin@biteandbliss.com'
  }
];

/* ─────────────────────────────────────────────
   2. LOCALSTORAGE HELPERS
   ───────────────────────────────────────────── */
function getRecipes() {
  try {
    return JSON.parse(localStorage.getItem('recipes')) || [];
  } catch { return []; }
}

function saveRecipes(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('bb_users')) || [];
  } catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem('bb_users', JSON.stringify(users));
}

function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem('bb_current_user')) || null;
  } catch { return null; }
}

function setCurrentUser(user) {
  if (user) {
    sessionStorage.setItem('bb_current_user', JSON.stringify(user));
  } else {
    sessionStorage.removeItem('bb_current_user');
  }
}

/* ─────────────────────────────────────────────
   3. SEED DATA INITIALISATION
   ───────────────────────────────────────────── */
const RECIPE_SEED_VERSION = 4;

function seedRecipes() {
  const existing = getRecipes();
  const storedVersion = parseInt(localStorage.getItem('recipeSeedVersion'), 10) || 0;

  if (existing.length < DEFAULT_RECIPES.length || storedVersion < RECIPE_SEED_VERSION) {
    // Replace seed recipes with fresh data, but keep anything users penned themselves
    const custom = existing.filter(r => r.isCustom);
    saveRecipes([...DEFAULT_RECIPES, ...custom]);
    localStorage.setItem('recipeSeedVersion', String(RECIPE_SEED_VERSION));
  }
}

function seedUsers() {
  const existing = getUsers();
  if (existing.length === 0) {
    const defaultUsers = [
      {
        id: 1, name: 'Admin Epicure', email: 'admin@biteandbliss.com',
        password: 'admin123', isAdmin: true,
        favorites: [], joinedAt: '2026-01-01'
      },
      {
        id: 2, name: 'Lady Genevieve', email: 'genevieve@biteandbliss.com',
        password: 'password123', isAdmin: false,
        favorites: [1, 2, 25], joinedAt: '2026-02-14'
      }
    ];
    saveUsers(defaultUsers);
  }
}

function resetToDefaultData() {
  saveRecipes(DEFAULT_RECIPES);
  localStorage.setItem('recipeSeedVersion', String(RECIPE_SEED_VERSION));
  seedUsers();
  showToast('Culinary archive restored to 63 seed recipes.', 'success');
}

/* ─────────────────────────────────────────────
   4. TOAST NOTIFICATIONS
   ───────────────────────────────────────────── */
function showToast(message, type = 'info') {
  const container = document.querySelector('.toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'toast-close';
  closeBtn.innerHTML = '×';
  closeBtn.onclick = () => toast.remove();
  toast.appendChild(closeBtn);

  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-visible'));

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ─────────────────────────────────────────────
   5. AUTHENTICATION
   ───────────────────────────────────────────── */
function registerUser(name, email, password) {
  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'An account with this email already exists.' };
  }
  const newUser = {
    id: Date.now(), name, email, password,
    isAdmin: false, favorites: [],
    joinedAt: new Date().toISOString().split('T')[0]
  };
  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);
  return { success: true, user: newUser };
}

function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u =>
    u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) {
    return { success: false, message: 'Invalid credentials. Please check your email and password.' };
  }
  setCurrentUser(user);
  return { success: true, user };
}

function logoutUser() {
  setCurrentUser(null);
  showToast('You have left the table. Visit again soon.', 'info');
  setTimeout(() => window.location.href = 'index.html', 800);
}

/* ─────────────────────────────────────────────
   6. HEADER AUTH STATE
   ───────────────────────────────────────────── */
function updateHeaderAuth() {
  const authContainer = document.getElementById('headerAuth');
  if (!authContainer) return;

  const user = getCurrentUser();
  if (user) {
    authContainer.innerHTML = `
      <a href="${user.isAdmin ? 'admin.html' : 'user.html'}" class="nav-link" style="color: var(--antique-gold);">
        ✦ ${user.name.split(' ')[0]}
      </a>
      <button onclick="logoutUser()" class="btn btn-sm btn-secondary" style="font-size:0.75rem; padding:6px 14px;">
        Leave Table
      </button>
    `;
  }
}

/* ─────────────────────────────────────────────
   7. RECIPE CARD HTML BUILDER
   ───────────────────────────────────────────── */
function buildRecipeCard(recipe) {
  const user = getCurrentUser();
  const favorites = user
    ? (getUsers().find(u => u.id === user.id) || {}).favorites || []
    : [];
  const isFav = favorites.includes(recipe.id);

  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <div class="card-media">
        <img
          class="card-image"
          src="${recipe.image}"
          alt="${recipe.title}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'"
        />
        <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${recipe.id}" aria-label="Save to favorites">
          ${isFav ? '♥' : '♡'}
        </button>
        <div class="card-badges">
          <span class="badge-cuisine">${recipe.category}</span>
          <span class="badge-calories">${recipe.calories} kcal</span>
        </div>
      </div>
      <div class="card-content">
        <div class="card-meta-row">
          <span>⏱ ${recipe.time}</span>
          <span>${recipe.difficulty}</span>
        </div>
        <h3 class="card-title">${recipe.title}</h3>
        <p class="card-desc">${recipe.desc}</p>
        <div class="card-footer">
          <span class="card-rating">★ ${recipe.rating.toFixed(1)}</span>
          <a href="recipe.html?id=${recipe.id}" class="card-link-arrow">View Recipe →</a>
        </div>
      </div>
    </div>
  `;
}

/* ─────────────────────────────────────────────
   8. RECIPES PAGE — renderRecipes & applyFilters
   ───────────────────────────────────────────── */
function renderRecipes(list) {
  const grid = document.getElementById('recipesGrid');
  if (!grid) return;

  if (!list || list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <p style="font-size: 1.4rem; font-style: italic;">No recipes found matching your search.</p>
        <p style="font-size: 0.9rem; margin-top: 8px;">Try adjusting your filters or clearing the search.</p>
      </div>
    `;
  } else {
    grid.innerHTML = list.map(buildRecipeCard).join('');
  }

  // Wire up fav buttons
  grid.querySelectorAll('.card-fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id);
      toggleFavorite(id);
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
    });
  });
}

function applyFilters() {
  const searchEl = document.getElementById('recipeSearch');
  const catEl = document.getElementById('categoryFilter');
  const sortEl = document.getElementById('sortFilter');
  const countEl = document.getElementById('resultsCount');

  const searchTerm = (searchEl ? searchEl.value : '').toLowerCase().trim();
  const category = catEl ? catEl.value : 'all';
  const sort = sortEl ? sortEl.value : 'default';

  let recipes = getRecipes();
  const total = 63;

  // Filter by category
  if (category && category !== 'all') {
    recipes = recipes.filter(r => r.category === category);
  }

  // Filter by search
  if (searchTerm) {
    recipes = recipes.filter(r =>
      r.title.toLowerCase().includes(searchTerm) ||
      r.desc.toLowerCase().includes(searchTerm) ||
      r.category.toLowerCase().includes(searchTerm) ||
      (r.ingredients && r.ingredients.some(i => i.toLowerCase().includes(searchTerm)))
    );
  }

  // Sort
  if (sort === 'title') {
    recipes.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'time') {
    recipes.sort((a, b) => {
      const aMin = parseInt(a.time) || 999;
      const bMin = parseInt(b.time) || 999;
      return aMin - bMin;
    });
  } else if (sort === 'calories') {
    recipes.sort((a, b) => (a.calories || 0) - (b.calories || 0));
  }

  // Update results count
  if (countEl) {
    countEl.textContent = `Showing ${recipes.length} of ${total} recipes`;
  }

  renderRecipes(recipes);
}

function initRecipesPage() {
  const grid = document.getElementById('recipesGrid');
  if (!grid) return;

  // Apply URL category param
  const urlParams = new URLSearchParams(window.location.search);
  const urlCategory = urlParams.get('category');
  if (urlCategory) {
    const catEl = document.getElementById('categoryFilter');
    if (catEl) catEl.value = urlCategory;

    // Sync pill active state
    document.querySelectorAll('.pill-filter').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === urlCategory);
    });
  }

  // Wire search input
  const searchEl = document.getElementById('recipeSearch');
  if (searchEl) {
    searchEl.addEventListener('input', applyFilters);
  }

  // Wire category dropdown
  const catEl = document.getElementById('categoryFilter');
  if (catEl) {
    catEl.addEventListener('change', () => {
      const val = catEl.value;
      document.querySelectorAll('.pill-filter').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === val);
      });
      applyFilters();
    });
  }

  // Wire sort dropdown
  const sortEl = document.getElementById('sortFilter');
  if (sortEl) {
    sortEl.addEventListener('change', applyFilters);
  }

  // Wire pill filters
  document.querySelectorAll('.pill-filter').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill-filter').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.category;
      const catEl = document.getElementById('categoryFilter');
      if (catEl) catEl.value = cat;
      applyFilters();
    });
  });

  // Initial render
  applyFilters();
}

/* ─────────────────────────────────────────────
   9. HOME PAGE — masterpiecesGrid & kitchenGrid
   ───────────────────────────────────────────── */
function initHomePage() {
  const masterpiecesGrid = document.getElementById('masterpiecesGrid');
  const kitchenGrid = document.getElementById('kitchenGrid');

  if (!masterpiecesGrid && !kitchenGrid) return;

  const recipes = getRecipes();

  // 6 featured "masterpieces"
  const masterpieceIds = [1, 2, 11, 12, 25, 62];
  if (masterpiecesGrid) {
    const masterpieces = masterpieceIds.map(id => recipes.find(r => r.id === id)).filter(Boolean);
    masterpiecesGrid.innerHTML = masterpieces.map(buildRecipeCard).join('');
    wireFavButtons(masterpiecesGrid);
  }

  // 8 kitchen grid
  const kitchenIds = [3, 14, 19, 27, 41, 47, 53, 63];
  if (kitchenGrid) {
    const kitchen = kitchenIds.map(id => recipes.find(r => r.id === id)).filter(Boolean);
    kitchenGrid.innerHTML = kitchen.map(buildRecipeCard).join('');
    wireFavButtons(kitchenGrid);
  }
}

function wireFavButtons(container) {
  container.querySelectorAll('.card-fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id);
      toggleFavorite(id);
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
    });
  });
}

/* ─────────────────────────────────────────────
   10. FAVORITES
   ───────────────────────────────────────────── */
function toggleFavorite(recipeId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    showToast('Please log in to save favorites.', 'warning');
    return;
  }

  const users = getUsers();
  const idx = users.findIndex(u => u.id === currentUser.id);
  if (idx === -1) return;

  if (!users[idx].favorites) users[idx].favorites = [];
  const favIdx = users[idx].favorites.indexOf(recipeId);
  if (favIdx > -1) {
    users[idx].favorites.splice(favIdx, 1);
    showToast('Removed from your culinary notebook.', 'info');
  } else {
    users[idx].favorites.push(recipeId);
    showToast('Saved to your culinary notebook! ♥', 'success');
  }
  saveUsers(users);
  setCurrentUser(users[idx]);
}

/* ─────────────────────────────────────────────
   11. RECIPE DETAIL PAGE
   ───────────────────────────────────────────── */
function initRecipeDetailPage() {
  const container = document.getElementById('recipeDetailContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'));

  if (!id) {
    container.innerHTML = `<div class="container section-padding text-center"><p>No recipe ID provided.</p></div>`;
    return;
  }

  const recipes = getRecipes();
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    container.innerHTML = `
      <div class="container section-padding" style="text-align:center; padding: 80px 20px;">
        <div class="gold-rule"></div>
        <span class="gold-eyebrow">RECIPE NOT FOUND</span>
        <h2 class="chapter-title">This tale has not been written yet.</h2>
        <a href="recipes.html" class="btn btn-primary" style="margin-top:24px;">Return to the Archive</a>
      </div>
    `;
    return;
  }

  document.title = `${recipe.title} — Bite & Bliss`;

  const ingredientsList = (recipe.ingredients || []).map(i =>
    `<li class="ingredient-item"><label><input type="checkbox" class="ingredient-check"> ${i}</label></li>`
  ).join('');

  const stepsList = (recipe.steps || []).map((s, idx) =>
    `<li class="step-item"><span class="step-number">${idx + 1}</span><span>${s}</span></li>`
  ).join('');

  const comments = recipe.comments || [];
  const commentsList = comments.length
    ? comments.map(c => `
        <div class="comment-item">
          <div class="comment-header">
            <strong>${c.author}</strong>
            <span class="comment-date">${c.date}</span>
            <span class="comment-rating">★ ${c.rating || 5}</span>
          </div>
          <p>${c.text}</p>
        </div>`).join('')
    : '<p style="color:var(--text-muted); font-style:italic;">Be the first to leave a tasting note.</p>';

  container.innerHTML = `
    <!-- Hero Section -->
    <section class="recipe-hero" style="position:relative; height:480px; overflow:hidden;">
      <img
        src="${recipe.image}"
        alt="${recipe.title}"
        style="width:100%; height:100%; object-fit:cover; display:block;"
        onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80'"
      />
      <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(42,16,24,0.95) 30%, transparent 80%);"></div>
      <div class="container" style="position:absolute; bottom:50px; left:50%; transform:translateX(-50%); width:100%; max-width:1200px; padding:0 5%;">
        <span class="badge-cuisine" style="margin-bottom:12px; display:inline-block;">${recipe.category}</span>
        <h1 style="font-family:var(--font-heading); font-style:italic; font-size:clamp(2rem,5vw,3.5rem); color:var(--champagne); margin-bottom:8px;">${recipe.title}</h1>
        <p style="color:var(--text-muted); font-size:1.1rem; max-width:600px;">${recipe.desc}</p>
      </div>
    </section>

    <!-- Meta Bar -->
    <div style="background:var(--espresso-soft); border-bottom:1px solid var(--hairline-gold);">
      <div class="container" style="max-width:1200px; margin:0 auto; padding:20px 5%; display:flex; flex-wrap:wrap; gap:30px; align-items:center;">
        <div style="text-align:center;">
          <div style="font-family:var(--font-ui); font-size:0.7rem; letter-spacing:2px; color:var(--antique-gold); text-transform:uppercase;">Time</div>
          <div style="font-size:1.2rem; font-weight:600; color:var(--champagne);">${recipe.time}</div>
        </div>
        <div style="text-align:center;">
          <div style="font-family:var(--font-ui); font-size:0.7rem; letter-spacing:2px; color:var(--antique-gold); text-transform:uppercase;">Difficulty</div>
          <div style="font-size:1.2rem; font-weight:600; color:var(--champagne);">${recipe.difficulty}</div>
        </div>
        <div style="text-align:center;">
          <div style="font-family:var(--font-ui); font-size:0.7rem; letter-spacing:2px; color:var(--antique-gold); text-transform:uppercase;">Rating</div>
          <div style="font-size:1.2rem; font-weight:600; color:var(--champagne);">★ ${recipe.rating.toFixed(1)}</div>
        </div>
        <div style="text-align:center;">
          <div style="font-family:var(--font-ui); font-size:0.7rem; letter-spacing:2px; color:var(--antique-gold); text-transform:uppercase;">Calories</div>
          <div style="font-size:1.2rem; font-weight:600; color:var(--champagne);">${recipe.calories} kcal</div>
        </div>
        <button
          onclick="toggleFavorite(${recipe.id}); this.textContent = this.textContent.includes('♡') ? '♥ Saved' : '♡ Save';"
          class="btn btn-secondary btn-sm"
          style="margin-left:auto;"
        >♡ Save to Notebook</button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container section-padding" style="max-width:1200px; margin:0 auto; padding: 60px 5%;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start;">

        <!-- Ingredients -->
        <div>
          <span class="gold-eyebrow">THE NOBLE INGREDIENTS</span>
          <h2 style="font-family:var(--font-heading); font-style:italic; font-size:2rem; margin-bottom:24px;">What you'll need</h2>
          <ul class="ingredients-list" style="list-style:none; display:flex; flex-direction:column; gap:12px;">
            ${ingredientsList}
          </ul>

          <!-- Nutrition -->
          <div style="margin-top:40px; padding:24px; background:var(--espresso-soft); border:1px solid var(--hairline-gold); border-radius:var(--radius-md);">
            <span class="gold-eyebrow" style="margin-bottom:12px; display:block;">NUTRITIONAL HARMONY</span>
            <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; text-align:center;">
              <div><div style="font-size:1.4rem; font-weight:700; color:var(--antique-gold);">${recipe.calories}</div><div style="font-size:0.75rem; color:var(--text-muted);">kcal</div></div>
              <div><div style="font-size:1.4rem; font-weight:700; color:var(--antique-gold);">${recipe.protein || '—'}</div><div style="font-size:0.75rem; color:var(--text-muted);">protein</div></div>
              <div><div style="font-size:1.4rem; font-weight:700; color:var(--antique-gold);">${recipe.fat || '—'}</div><div style="font-size:0.75rem; color:var(--text-muted);">fat</div></div>
              <div><div style="font-size:1.4rem; font-weight:700; color:var(--antique-gold);">${recipe.carbs || '—'}</div><div style="font-size:0.75rem; color:var(--text-muted);">carbs</div></div>
            </div>
          </div>
        </div>

        <!-- Steps -->
        <div>
          <span class="gold-eyebrow">THE PREPARATION RITUAL</span>
          <h2 style="font-family:var(--font-heading); font-style:italic; font-size:2rem; margin-bottom:24px;">How to craft it</h2>
          <ol class="steps-list" style="list-style:none; display:flex; flex-direction:column; gap:20px;">
            ${stepsList}
          </ol>
        </div>
      </div>

      <!-- Comments -->
      <div style="margin-top:60px; padding-top:40px; border-top:1px solid var(--hairline-gold);">
        <span class="gold-eyebrow">TASTING NOTES</span>
        <h2 style="font-family:var(--font-heading); font-style:italic; font-size:2rem; margin-bottom:30px;">Guest impressions</h2>

        <div style="display:flex; flex-direction:column; gap:20px; margin-bottom:40px;">
          ${commentsList}
        </div>

        <!-- Add Comment Form -->
        <form id="commentForm" style="background:var(--espresso-soft); padding:30px; border-radius:var(--radius-md); border:1px solid var(--hairline-gold);">
          <h3 style="font-family:var(--font-heading); font-style:italic; margin-bottom:20px;">Leave a tasting note</h3>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
            <input type="text" id="commentAuthor" class="form-input" placeholder="Your name or title" />
            <select id="commentRating" class="form-select">
              <option value="5">★★★★★ Exceptional</option>
              <option value="4">★★★★ Excellent</option>
              <option value="3">★★★ Good</option>
              <option value="2">★★ Fair</option>
              <option value="1">★ Disappointing</option>
            </select>
          </div>
          <textarea id="commentText" class="form-textarea" rows="3" placeholder="Share your experience cooking this dish..."></textarea>
          <button type="submit" class="btn btn-primary" style="margin-top:16px;">Inscribe Tasting Note</button>
        </form>
      </div>
    </div>
  `;

  // Wire comment form
  const commentForm = document.getElementById('commentForm');
  if (commentForm) {
    commentForm.addEventListener('submit', e => {
      e.preventDefault();
      const author = (document.getElementById('commentAuthor').value || 'Anonymous Epicure').trim();
      const rating = document.getElementById('commentRating').value;
      const text = document.getElementById('commentText').value.trim();

      if (!text) {
        showToast('Please write a tasting note before submitting.', 'warning');
        return;
      }

      const recipes = getRecipes();
      const recipeIdx = recipes.findIndex(r => r.id === id);
      if (recipeIdx === -1) return;

      if (!recipes[recipeIdx].comments) recipes[recipeIdx].comments = [];
      recipes[recipeIdx].comments.push({
        author,
        rating: parseInt(rating),
        text,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      });
      saveRecipes(recipes);
      showToast('Your tasting note has been inscribed!', 'success');
      commentForm.reset();
      // Refresh comments display
      setTimeout(() => initRecipeDetailPage(), 100);
    });
  }
}

/* ─────────────────────────────────────────────
   12. USER DASHBOARD
   ───────────────────────────────────────────── */
function initUserDashboard() {
  const dashboard = document.getElementById('userDashboard');
  if (!dashboard) return;

  const user = getCurrentUser();
  if (!user) {
    showToast('Please log in to access your personal notebook.', 'warning');
    setTimeout(() => window.location.href = 'login.html?redirect=user.html', 1200);
    return;
  }

  // Refresh user from storage
  const users = getUsers();
  const freshUser = users.find(u => u.id === user.id) || user;

  // Populate header info
  const nameEl = document.getElementById('dashUserName');
  const emailEl = document.getElementById('dashUserEmail');
  if (nameEl) nameEl.textContent = freshUser.name;
  if (emailEl) emailEl.textContent = freshUser.email;

  // Stats
  const favorites = freshUser.favorites || [];
  const recipes = getRecipes();
  const customRecipes = recipes.filter(r => r.isCustom && r.author === freshUser.email);

  const favCountEl = document.getElementById('dashFavCount');
  const customCountEl = document.getElementById('dashCustomCount');
  if (favCountEl) favCountEl.textContent = favorites.length;
  if (customCountEl) customCountEl.textContent = customRecipes.length;

  // Render grids
  const favGrid = document.getElementById('userFavoritesGrid');
  const customGrid = document.getElementById('userCustomGrid');

  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

  if (favGrid) {
    if (favoriteRecipes.length === 0) {
      favGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);"><p style="font-style:italic;">No favorites saved yet. Explore recipes and click ♡ to save them.</p><a href="recipes.html" class="btn btn-primary" style="margin-top:16px;">Explore Recipes</a></div>`;
    } else {
      favGrid.innerHTML = favoriteRecipes.map(buildRecipeCard).join('');
      wireFavButtons(favGrid);
    }
  }

  if (customGrid) {
    if (customRecipes.length === 0) {
      customGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);"><p style="font-style:italic;">You haven't penned any recipes yet.</p><a href="add-recipe.html" class="btn btn-primary" style="margin-top:16px;">+ Pen New Recipe</a></div>`;
    } else {
      customGrid.innerHTML = customRecipes.map(buildRecipeCard).join('');
      wireFavButtons(customGrid);
    }
  }

  // Tab switching
  document.querySelectorAll('.dash-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dash-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.dataset.tab;
      if (favGrid) favGrid.style.display = tab === 'favorites' ? 'grid' : 'none';
      if (customGrid) customGrid.style.display = tab === 'custom' ? 'grid' : 'none';
    });
  });
}

/* ─────────────────────────────────────────────
   13. ADMIN DASHBOARD
   ───────────────────────────────────────────── */
function initAdminDashboard() {
  const adminDash = document.getElementById('adminDashboard');
  if (!adminDash) return;

  const user = getCurrentUser();
  if (!user || !user.isAdmin) {
    showToast('Admin access only. Please log in with admin credentials.', 'danger');
    setTimeout(() => window.location.href = 'login.html?redirect=admin.html', 1200);
    return;
  }

  const recipes = getRecipes();
  const users = getUsers();
  const totalComments = recipes.reduce((sum, r) => sum + ((r.comments || []).length), 0);

  // Stats
  const totalRecipesEl = document.getElementById('adminTotalRecipes');
  const totalUsersEl = document.getElementById('adminTotalUsers');
  const totalCommentsEl = document.getElementById('adminTotalComments');
  if (totalRecipesEl) totalRecipesEl.textContent = recipes.length;
  if (totalUsersEl) totalUsersEl.textContent = users.length;
  if (totalCommentsEl) totalCommentsEl.textContent = totalComments;

  // Recipes table
  const recipesTableBody = document.getElementById('adminRecipesTableBody');
  if (recipesTableBody) {
    recipesTableBody.innerHTML = recipes.map(r => `
      <tr>
        <td>${r.id}</td>
        <td><a href="recipe.html?id=${r.id}" style="color:var(--antique-gold);">${r.title}</a></td>
        <td>${r.category}</td>
        <td>${r.time}</td>
        <td>${r.author || 'admin'}</td>
        <td style="text-align:right;">
          <a href="recipe.html?id=${r.id}" class="btn btn-sm btn-secondary" style="padding:4px 10px; font-size:0.75rem;">View</a>
          <button onclick="adminDeleteRecipe(${r.id})" class="btn btn-sm" style="padding:4px 10px; font-size:0.75rem; background:var(--wine); color:var(--champagne); border:none; cursor:pointer; border-radius:4px; margin-left:4px;">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  // Users table
  const usersTableBody = document.getElementById('adminUsersTableBody');
  if (usersTableBody) {
    usersTableBody.innerHTML = users.map(u => `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td><span style="color:${u.isAdmin ? 'var(--antique-gold)' : 'var(--text-muted)'};">${u.isAdmin ? 'Admin' : 'Member'}</span></td>
        <td>${u.joinedAt || 'N/A'}</td>
        <td style="text-align:right;">
          ${!u.isAdmin ? `<button onclick="adminDeleteUser(${u.id})" class="btn btn-sm" style="padding:4px 10px; font-size:0.75rem; background:var(--wine); color:var(--champagne); border:none; cursor:pointer; border-radius:4px;">Remove</button>` : '<span style="color:var(--text-muted); font-size:0.8rem;">Protected</span>'}
        </td>
      </tr>
    `).join('');
  }
}

function adminDeleteRecipe(id) {
  if (!confirm(`Delete recipe ID ${id}? This cannot be undone.`)) return;
  const recipes = getRecipes().filter(r => r.id !== id);
  saveRecipes(recipes);
  showToast('Recipe removed from the archive.', 'info');
  setTimeout(() => location.reload(), 500);
}

function adminDeleteUser(id) {
  if (!confirm('Remove this member? This cannot be undone.')) return;
  const users = getUsers().filter(u => u.id !== id);
  saveUsers(users);
  showToast('Member removed from the roster.', 'info');
  setTimeout(() => location.reload(), 500);
}

/* ─────────────────────────────────────────────
   14. ADD RECIPE FORM
   ───────────────────────────────────────────── */
function initAddRecipePage() {
  const form = document.getElementById('addRecipeForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById('recipeTitle').value.trim();
    const category = document.getElementById('recipeCategory').value;
    const imageInput = document.getElementById('recipeImage').value.trim();
    const time = document.getElementById('recipeTime').value.trim();
    const difficulty = document.getElementById('recipeDifficulty').value;
    const calories = parseInt(document.getElementById('recipeCalories').value) || 0;
    const protein = document.getElementById('recipeProtein').value.trim();
    const fat = document.getElementById('recipeFat').value.trim();
    const carbs = document.getElementById('recipeCarbs').value.trim();
    const ingredientsRaw = document.getElementById('recipeIngredients').value.trim();
    const stepsRaw = document.getElementById('recipeSteps').value.trim();

    if (!title || !time || !ingredientsRaw || !stepsRaw) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }

    const defaultImages = {
      Indian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
      Italian: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
      Chinese: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
      Dessert: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
      Snacks: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80',
      Healthy: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
      Beverages: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80',
      'Middle Eastern': 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?auto=format&fit=crop&w=600&q=80',
      Mexican: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
      Thai: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80'
    };

    const currentUser = getCurrentUser();
    const recipes = getRecipes();
    const newId = Math.max(...recipes.map(r => r.id), 65) + 1;

    const newRecipe = {
      id: newId, title, category,
      image: imageInput || defaultImages[category] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      time, difficulty, calories, protein, fat, carbs,
      rating: 4.5,
      desc: ingredientsRaw.split('\n')[0] || title,
      ingredients: ingredientsRaw.split('\n').filter(Boolean),
      steps: stepsRaw.split('\n').filter(Boolean),
      comments: [],
      isCustom: true,
      author: currentUser ? currentUser.email : 'anonymous'
    };

    recipes.push(newRecipe);
    saveRecipes(recipes);

    showToast(`"${title}" has been inscribed into the archive!`, 'success');
    setTimeout(() => window.location.href = `recipe.html?id=${newId}`, 900);
  });
}

/* ─────────────────────────────────────────────
   15. HERO SLIDER
   ───────────────────────────────────────────── */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-nav-arrow.prev');
  const nextBtn = document.querySelector('.hero-nav-arrow.next');

  if (!slides.length) return;

  let current = 0;
  let timer = null;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
  }

  function start() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  function reset() {
    clearInterval(timer);
    start();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); reset(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); reset(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); reset(); }));

  start();
}

/* ─────────────────────────────────────────────
   16. MOBILE MENU
   ───────────────────────────────────────────── */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.main-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.textContent = nav.classList.contains('open') ? '✕' : '☰';
  });
}

/* ─────────────────────────────────────────────
   17. PAGE ROUTER — DOMContentLoaded
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Always run these
  seedRecipes();
  seedUsers();
  updateHeaderAuth();
  initMobileMenu();

  const path = window.location.pathname.toLowerCase();

  if (path.includes('recipes.html')) {
    initRecipesPage();
  } else if (path.includes('recipe.html')) {
    initRecipeDetailPage();
  } else if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
    initHomePage();
    initHeroSlider();
  } else if (path.includes('user.html')) {
    initUserDashboard();
  } else if (path.includes('admin.html')) {
    initAdminDashboard();
  } else if (path.includes('add-recipe.html')) {
    initAddRecipePage();
  }
});