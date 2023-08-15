import os
from supabase.client import create_client
from supabase.client import Client
from dotenv import load_dotenv
import pandas as pd 
from sklearn.neighbors import NearestNeighbors
import flask 
load_dotenv()

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)

userid = ''
def changeDatatoNum(x): 
    tmp = []
    for i in x : 
        if( i == 'sangat setuju'): 
            tmp += [5]
        elif(i == 'kurang setuju'): 
            tmp += [4]
        elif(i == 'netral'): 
            tmp += [3]
        elif(i == 'kurang setuju'): 
            tmp += [2]
        else : 
            tmp += [1]
    return tmp 
        
def KNN(id_target): 
  # Taking data from supabase
    response_unit = supabase.table("daftarunit").select("*").execute()
    df_unit = pd.DataFrame(response_unit.data)
    df_unit = df_unit.drop([ 'id','created_at','user_id' ], axis = 1)
    df_unit = pd.json_normalize(df_unit['roadmap_data'])
    unit = df_unit
    data_raw= unit.drop(['nama', 'deskripsi'],axis=1)

    fin_arr = []
    tmp = []
    i_1 = 0 
    for i,r in data_raw.iterrows() : 
        if i != i_1 : 
            tmp = []
            i_1 = i
        tmp+= changeDatatoNum(r)
        fin_arr.append(tmp)

    X = fin_arr

    response = supabase.table("users").select("*").execute()
    df = pd.DataFrame(response.data)
    df = df[ df['id'] == id_target ]
    roadmap_data = pd.json_normalize(df['roadmap_data'])
    df = roadmap_data
    df = changeDatatoNum(df.iloc[0].values)
    df = pd.DataFrame(df)
    df = df.T
    data_dummy = df.iloc[len(df)-1].values.reshape(1,-1)

    neigh = NearestNeighbors(n_neighbors=3, algorithm='brute')
    neigh.fit(X)
    distances,indices = neigh.kneighbors(data_dummy)
    print('Recommendations for "The Post":\n')
    tmp = []
    for i in range(len(distances.flatten())):
        tmp+= [unit['nama'].iloc[indices.flatten()[i]]]
    return tmp[0], tmp[1], tmp[2]



api = flask.Flask(__name__)

@api.route('/api/userid', methods= ['POST'])
def get_userid(): 
    jsonUserId= flask.request.get_json()
    user_id = jsonUserId['id']
    global userid
    userid = user_id
    return user_id

@api.route('/api/profile', methods =['GET'])
def my_profile():
    global userid 
    if flask.request.method == 'GET': 
      
      nama1,nama2,nama3 = KNN(userid)
      response_body = {
          "name1": nama1,
          "name2" :nama2,
          "name3": nama3
      }
    return response_body


