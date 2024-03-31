#include "bits/stdc++.h"
using namespace std;

#define nl "\n"
#define ll long long
#define all(v) v.begin(), v.end()
#define rall(v) v.rbegin(), v.rend()
#define sz(v) (int) v.size()

template<typename T = int>
istream &operator>>(istream &in, vector<T> &v) {
    for (auto &x: v) in >> x;
    return in;
}

template<typename T = int>
ostream &operator<<(ostream &out, const vector<T> &v) {
    for (const T &x: v) out << x << " ";
    return out;
}

void Sira() {
    ios_base::sync_with_stdio(false), cin.tie(nullptr), cout.tie(nullptr);
#ifndef ONLINE_JUDGE
    freopen("input.txt", "r", stdin), freopen("output.txt", "w", stdout);
#endif
}

void solve(){
    int h , w , xa , ya , xb , yb;
    cin >> h >> w >> xa >> ya >> xb >> yb;

    if(xa >= xb) return void(cout << "Draw" << nl);

    int diff = xb - xa;
    if(diff & 1){ // alice might win
        if(ya < yb){
            if(abs(ya - yb) <= 1 or w <= ya + ceil(diff / 2.0)) cout << "Alice" << nl;
            else cout << "Draw" << nl;
        }else{
            if(abs(ya - yb) <= 1 or ya - ceil(diff / 2.0) <= 1) cout << "Alice" << nl;
            else cout << "Draw" << nl;
        }
    }else{ // bob might win
        if(ya < yb){
            if(yb - ceil(diff / 2.0) <= 1) cout << "Bob" << nl;
            else cout << "Draw" << nl;
        }else{
            if(w <= yb + ceil(diff / 2.0) or ya == yb) cout << "Bob" << nl;
            else cout << "Draw" << nl;
        }
    }




}

int main() {
    Sira();
    int t = 1;
    cin >> t;
    while(t--){
        solve();
    }
    return 0;
}
